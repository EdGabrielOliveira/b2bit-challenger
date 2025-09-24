import { describe, it, expect } from "vitest";

function somar(a: number, b: number) {
  return a + b;
}

function isValidEmail(email: string) {
  return email.includes("@") && email.includes(".");
}

describe("🧮 Testes Básicos - Matemática", () => {
  it("➕ Deve somar 2 + 3 = 5", () => {
    const resultado = somar(2, 3);

    expect(resultado).toBe(5);
  });

  it("➕ Deve somar números negativos", () => {
    expect(somar(-1, -2)).toBe(-3);
  });
});

describe("📧 Testes de Email", () => {
  it("✅ Deve validar email válido", () => {
    expect(isValidEmail("teste@gmail.com")).toBe(true);
  });

  it("❌ Deve rejeitar email sem @", () => {
    expect(isValidEmail("teste.com")).toBe(false);
  });

  it("❌ Deve rejeitar email sem .", () => {
    expect(isValidEmail("teste@gmail")).toBe(false);
  });
});
