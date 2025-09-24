"use client";

import { getUser } from "@/core/api/routers/user.router";
import { Card } from "@/core/components/ui/card";
import React, { useEffect } from "react";
import { User } from "@/core/api/types/user.type";
import Image from "next/image";
import { Button } from "@/core/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const [user, setUser] = React.useState<User | null>(null);
  const [isClient, setIsClient] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    const fetchData = async () => {
      try {
        const user = await getUser();
        setUser(user);
        console.log(user);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Card className="w-full max-w-md p-4 py-10 shadow-xl shadow-gray-300 border-none bg-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Carregando...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-screen w-full font-sans">
      <div className="flex h-[10%] items-center justify-end p-4">
        <Button onClick={handleLogout} className="bg-[#02274d] text-lg py-6 hover:scale-95 text-white w-1/6">
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center h-[90%] bg-gray-100">
        <Card className="w-full max-w-md p-4 px-6 py-10 shadow-xl rounded-2xl shadow-gray-300 border-none bg-white">
          {user ? (
            <div className="text-center">
              <div className="flex flex-col items-center mb-4 gap-4">
                <label>Profile picture</label>
                {user.avatar?.low ? (
                  <Image
                    src={user.avatar.low}
                    alt="Avatar"
                    width={60}
                    height={60}
                    className="rounded-md mb-4 m-auto object-cover"
                    style={{ width: "60px", height: "60px" }}
                    onError={() => {
                      console.error("Erro ao carregar imagem do avatar");
                    }}
                    priority={false}
                    unoptimized
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 mx-auto flex items-center justify-center">
                    <span className="text-gray-600 text-2xl">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 text-start ">
                <div>
                  <label>
                    Your <strong>Name</strong>
                  </label>
                  <h1 className="bg-gray-200 px-4 py-2 rounded-md">{user.name}</h1>
                </div>
                <div>
                  <label>
                    Your <strong>Email</strong>
                  </label>
                  <p className="bg-gray-200 px-4 py-2 rounded-md">{user.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p>Carregando...</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
