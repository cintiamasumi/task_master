
import { Task } from "@/server/db";
import { updateTaskInput } from "../update-task-status";

jest.mock("@/server/db", () => ({
    Task: {
        findByPk: jest.fn(),
    },
}));

describe("updateTaskInput", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should throw an error if status is invalid", async () => {
        const input = {
            id: 1,
            status: "InvalidStatus",
        };

        await expect(updateTaskInput(input)).rejects.toThrow(
            "Status invalido. Aceito apenas Pendente,Concluida"
        );
    });

    it("should throw an error if the task does not exist", async () => {
        (Task.findByPk as jest.Mock).mockResolvedValue(null);

        const input = {
            id: 1,
            status: "Pendente",
        };

        await expect(updateTaskInput(input)).rejects.toThrow(
            "Tarefa não encontrada."
        );
    });

    it("should update the task status if input is valid", async () => {
        const mockTask = {
            id: 1,
            title: "Teste",
            status: "Pendente",
            update: jest.fn().mockResolvedValue(true),
        };

        (Task.findByPk as jest.Mock).mockResolvedValue(mockTask);

        const input = {
            id: 1,
            status: "Concluida",
        };

        const result = await updateTaskInput(input);

        expect(Task.findByPk).toHaveBeenCalledWith(input.id);
        expect(mockTask.update).toHaveBeenCalledWith(
            { status: input.status },
            { where: { id: input.id } }
        );

        expect(result).toEqual(mockTask);
    });
});
