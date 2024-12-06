
import { Task } from "@/server/db";
import { deleteTask } from "../delete-task";

jest.mock("@/server/db", () => ({
    Task: {
        findByPk: jest.fn(),
    },
}));

describe("deleteTask", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should throw an error if the task does not exist", async () => {
        (Task.findByPk as jest.Mock).mockResolvedValue(null);

        const input = {
            id: 1,
        };

        await expect(deleteTask(input)).rejects.toThrow("Tarefa não encontrada");
    });

    it("should mark a task as deleted if it exists", async () => {
        const mockTask = {
            id: 1,
            title: "Teste",
            update: jest.fn().mockResolvedValue(true),
        };

        (Task.findByPk as jest.Mock).mockResolvedValue(mockTask);
          

        const input = {
            id: 1,
        };

        const result = await deleteTask(input);

        expect(Task.findByPk).toHaveBeenCalledWith(input.id);
        expect(mockTask.update).toHaveBeenCalledWith(
            { deletedAt: expect.any(Date) },
            { where: { id: input.id } }
        );

        expect(result).toEqual({ message: "Tarefa marcada como excluida" });
    });
});
