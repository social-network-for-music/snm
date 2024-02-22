import { useEffect } from "react";

import {
	useRouter,

	useSearchParams
} from "next/navigation";

import Link from "next/link";

import { toast } from "react-toastify";

import { useForm } from "react-hook-form";

import * as icons from "react-icons/fa";

import * as auth from "@/api/auth.api";

import type { SubmitHandler } from "react-hook-form";

import type { ILoginData } from "@/api/auth.api";

export default function Index() {
	const router = useRouter();

	const searchParams = useSearchParams();

	const {
		register,

		handleSubmit
	} = useForm<ILoginData>();

	useEffect(() => {
		if (searchParams.get("timeout")) {
			localStorage.removeItem("token");

			toast.info("Session expired, log in again...");
		}
	}, []);

	useEffect(() => {
		if (localStorage.getItem("token"))
			router.push("/explore/tracks");
	}, []);

	const onSubmit: SubmitHandler<ILoginData> = async (data) => {
		try {
			const request = await auth.login(data);

			localStorage.setItem("token", request.data.token);

			router.push("/explore/tracks");
		} catch (error: any) {
			toast.error(error.response?.data.error ??
				"Generic error, try again later...");
		}
	};

	return (
		<div className="flex items-center justify-center xs:mt-8 sm:mt-20 text-white">
			<form
				className="w-full max-w-lg px-5"

				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="text-center xs:mb-7 sm:mb-10">
                	<h1 className="xs:text-5xl sm:text-6xl font-bold -skew-y-3 bg-spotify-green">
						SNM ♪
					</h1>

                	<h3 className="xs:text-base sm:text-xl font-semibold -skew-y-3">
						Log in to explore our awesome playlists!
					</h3>
				</div>

				<div className="mb-5">
					<label className="inline-block text-md mb-2">
						<icons.FaUser className="inline -mt-1 mr-1" /> E-mail
					</label>

					<input
						type="text"
						placeholder="nome@dominio.com"
						className="w-full border-2 border-gray-300 py-2 px-3 rounded-md outline-none leading-tight text-spotify-black focus-within:border-spotify-green"

						{...register("email")}
					/>
				</div>

				<div className="mb-5">
					<label className="inline-block text-md mb-2">
						<icons.FaKey className="inline -mt-1 mr-1" /> Password
					</label>

					<input
						type="password"
						placeholder="••••••••••••"
						className="w-full border-2 border-gray-300 py-2 px-3 rounded-md outline-none leading-tight text-spotify-black focus-within:border-spotify-green"

						{...register("password")}
					/>
				</div>

				<div className="flex items-center mb-4">
					<input
						type="checkbox"
						className="w-4 h-4 rounded accent-spotify-green"
						{...register("rememberMe")}
					/>

					<label className="ms-2 text-sm font-medium">
						Remember me
					</label>
				</div>

				<div className="mb-5">
					<button
						type="submit"

						className="text-xl px-4 py-2 rounded-md font-bold w-full leading-tight bg-spotify-green hover:bg-spotify-darkgreen"
					>
						Log in
					</button>
				</div>

				<hr className="mb-5" />

				<div className="text-center">
					<Link href="/register" className="text-sm text-spotify-green font-semibold underline">
						Don't have an account yet? Join us now!
					</Link>
				</div>
			</form>
		</div>
	);
}
