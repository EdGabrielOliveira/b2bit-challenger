"use client";

import { Card, CardContent } from "@/core/components/ui/card";
import * as yup from "yup";
import React from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { Button } from "@/core/components/ui/button";
import { toast } from "sonner";
import { login } from "@/core/api/routers/login.router";
import { useRouter } from "next/navigation";
import InputComponent from "@/core/components/InputComponent";

const userSchema = yup.object().shape({
  email: yup.string().email("Por favor, insira um e-mail válido").required("E-mail é obrigatório"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("Senha é obrigatória"),
});

export default function Homepage() {
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      await userSchema.validate(form, { abortEarly: false });

      const response = await login({
        email: form.email,
        password: form.password,
      });

      toast.success("Login realizado com sucesso!", {
        description: `Bem-vindo, ${response.user.name}!`,
      });

      setTimeout(() => {
        router.push("/auth");
      }, 1500);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
      } else if (error instanceof Error) {
        toast.error("Erro no login", {
          description: error.message,
        });
      } else {
        toast.error("Erro inesperado", {
          description: "Ocorreu um erro inesperado. Tente novamente.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4 py-10 shadow-xl shadow-gray-300 border-none bg-white">
        <Image src={Logo} alt="Logo" width={300} height={300} className="m-auto" />
        <CardContent className="flex flex-col gap-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <InputComponent
                label="E-mail"
                placeholder="@gmail.com"
                error={errors.email}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <InputComponent
                label="Password"
                placeholder="********"
                error={errors.password}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                type="password"
              />
            </div>
            <div className="mt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-[#02274d] hover:scale-95 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
