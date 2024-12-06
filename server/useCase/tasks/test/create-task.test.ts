
import { Task } from "@/server/db";
import { createTask } from "../create-task";
/* eslint-disable @typescript-eslint/no-explicit-any */
jest.mock("@/server/db", () => ({
    Task: {
        create: jest.fn(),
    },
}));

describe("createTask", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should throw an error if title is missing", async () => {
        
        const input: any = {
            description: "Descrição de teste",
            due_date: new Date(new Date().getTime() + 1000 * 60 * 60), // 1 hora no futuro
        }

        await expect(createTask(input)).rejects.toThrow("O titulo é obrigatório");
    });

    it("should throw an error if due_date is in the past", async () => {
        const input = {
            title: "Teste",
            description: "Descrição de teste",
            due_date: new Date(new Date().getTime() - 1000 * 60 * 60), // 1 hora no passado
        };

        await expect(createTask(input)).rejects.toThrow("A data de vencimento deve ser no futuro");
    });

    it("should create a task if input is valid", async () => {
        const input = {
            title: "Teste",
            description: "Descrição de teste",
            due_date: new Date(new Date().getTime() + 1000 * 60 * 60), // 1 hora no futuro
        };

        const mockTask = {
            id: 1,
            ...input,
            status: "Pendente",
        };

        jest.spyOn(Task, "create").mockResolvedValue(mockTask as any);

        const result = await createTask(input);

        expect(Task.create).toHaveBeenCalledWith({
            title: input.title,
            description: input.description || "",
            due_date: input.due_date,
            status: "Pendente",
        });

        expect(result).toEqual(mockTask);
    });
});
