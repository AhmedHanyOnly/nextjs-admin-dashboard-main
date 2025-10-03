"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";
import { toast } from "sonner";

interface FormValues {
  email: string;
  password: string;
}

export default function SignInForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    console.log(data)
    try {
      const res = await login(data);
      if (res.token) {
        toast.success(res.message || t("login.loginSuccess"));
        router.push("/");
      } else {
        toast.error(res.message || t("login.loginFailed"));
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message || t("login.loginFailed");
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            {t("login.title")}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("login.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <Label>
                {t("login.email")} <span className="text-error-500">*</span>
              </Label>
              <Input
                {...register("email", { required: t("login.emailRequired") })}
                placeholder={t("login.emailPlaceholder")}
                type="email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            <div>
              <Label>
                {t("login.password")} <span className="text-error-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  {...register("password", { required: t("login.passwordRequired") })}
                  type={showPassword ? "text" : "password"}
                  placeholder={t("login.passwordPlaceholder")}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer end-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                  )}
                </span>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox checked={isChecked} onChange={setIsChecked} />
                <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                  {t("login.rememberMe")}
                </span>
              </div>
              <Link
                href="/reset-password"
                className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                {t("login.forgotPassword")}
              </Link>
            </div>

            <div>
              <Button className="w-full" size="sm" disabled={loading}>
                {loading ? t("login.loggingIn") : t("login.loginButton")}
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-5">
          <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
            {t("login.noAccount")}{" "}
            <Link
              href="/signup"
              className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              {t("login.signUp")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
