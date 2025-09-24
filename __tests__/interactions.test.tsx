import { describe, it, expect } from "vitest";
import * as yup from "yup";

const userSchema = yup.object().shape({
  email: yup.string().email("Por favor, insira um e-mail válido").required("E-mail é obrigatório"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("Senha é obrigatória"),
});

describe("🔐 Validações do Formulário", () => {
  it("✅ Deve aceitar dados válidos", async () => {
    const dadosValidos = {
      email: "user@b2bit.com",
      password: "123456",
    };

    const resultado = await userSchema.validate(dadosValidos);
    expect(resultado).toEqual(dadosValidos);
  });

  it("❌ Deve rejeitar email inválido", async () => {
    const dadosInvalidos = {
      email: "email-errado",
      password: "123456",
    };

    await expect(userSchema.validate(dadosInvalidos)).rejects.toThrow("Por favor, insira um e-mail válido");
  });

  it("❌ Deve rejeitar senha muito curta", async () => {
    const dadosInvalidos = {
      email: "user@b2bit.com",
      password: "123",
    };

    await expect(userSchema.validate(dadosInvalidos)).rejects.toThrow("A senha deve ter pelo menos 6 caracteres");
  });

  it("❌ Deve rejeitar email vazio", async () => {
    const dadosInvalidos = {
      email: "",
      password: "123456",
    };

    await expect(userSchema.validate(dadosInvalidos)).rejects.toThrow("E-mail é obrigatório");
  });
});
