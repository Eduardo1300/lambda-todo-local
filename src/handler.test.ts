import { describe, it, expect } from "vitest";
import { handler } from "./handler";

describe("Lambda Todo Handler", () => {
  describe("GET /todos", () => {
    it("should return empty array initially", async () => {
      const response = await handler({ httpMethod: "GET" });
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(Array.isArray(body)).toBe(true);
    });
  });

  describe("POST /todos", () => {
    it("should return 400 when title is missing", async () => {
      const response = await handler({
        httpMethod: "POST",
        body: JSON.stringify({}),
      });
      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.error).toBeDefined();
    });

    it("should return 400 when title is not a string", async () => {
      const response = await handler({
        httpMethod: "POST",
        body: JSON.stringify({ titulo: 123 }),
      });
      expect(response.statusCode).toBe(400);
    });

    it("should return 400 when title is too short", async () => {
      const response = await handler({
        httpMethod: "POST",
        body: JSON.stringify({ titulo: "ab" }),
      });
      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.error).toContain("mínimo");
    });

    it("should return 400 when title is too long", async () => {
      const response = await handler({
        httpMethod: "POST",
        body: JSON.stringify({ titulo: "a".repeat(101) }),
      });
      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.error).toContain("exceder");
    });

    it("should return 400 when title is empty string", async () => {
      const response = await handler({
        httpMethod: "POST",
        body: JSON.stringify({ titulo: "   " }),
      });
      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.error).toContain("vacío");
    });

    it("should create a todo with valid title", async () => {
      const response = await handler({
        httpMethod: "POST",
        body: JSON.stringify({ titulo: "Aprender AWS Lambda" }),
      });
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.id).toBeDefined();
      expect(body.titulo).toBe("Aprender AWS Lambda");
      expect(body.completada).toBe(false);
    });

    it("should trim whitespace from title", async () => {
      const response = await handler({
        httpMethod: "POST",
        body: JSON.stringify({ titulo: "  Test Title  " }),
      });
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.titulo).toBe("Test Title");
    });
  });

  describe("Invalid method", () => {
    it("should return 405 for unsupported methods", async () => {
      const response = await handler({ httpMethod: "DELETE" });
      expect(response.statusCode).toBe(405);
      const body = JSON.parse(response.body);
      expect(body.error).toContain("no permitido");
    });
  });

  describe("Error handling", () => {
    it("should handle invalid JSON", async () => {
      const response = await handler({
        httpMethod: "POST",
        body: "invalid json",
      });
      expect(response.statusCode).toBe(500);
    });
  });
});
