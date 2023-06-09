'use client';

import { AiFillGithub } from "react-icons/ai";
import {FcGoogle} from "react-icons/fc"
import { FieldValues,SubmitHandler,useForm } from "react-hook-form";
import { useCallback,useState } from "react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signIn} from 'next-auth/react'
import {useRouter} from "next/navigation"


const LoginModal = () => {
    const RegisterModal=useRegisterModal();
    const LoginModal=useLoginModal();
    const router=useRouter();

    const [isLoading,setIsLoading]=useState(false);

    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    }=useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    })

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);

        signIn('credentials',{
            ...data,
            redirect:false
        })
        .then((callback)=>{
            setIsLoading(false);
            if(callback?.ok){
                toast.success('Logged In');
                router.refresh();
                LoginModal.onClose();
            }

            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }
    
    const toggle=useCallback(()=>{
        LoginModal.onClose();
        RegisterModal.onOpen();
    },[LoginModal,RegisterModal])

    const bodyContent=(
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome back"
                subtitle="Login to your Account"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent=(
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={()=>signIn('google')}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={()=>signIn('github')}
            />
            <div
                className="
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                "
            >
                <div
                    className="
                        flex
                        flex-row
                        items-center
                        justify-center
                        gap-2
                    "
                >
                    <div>
                        First time using airbnb?
                    </div>
                    <div
                        onClick={toggle}
                        className="
                            hover:underline
                            text-neutral-800
                            cursor-pointer
                        "
                    >
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <Modal
        disabled={isLoading}
        isOpen={LoginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={LoginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal