import { useEffect } from "react";

import {
	useRouter,

	useSearchParams
} from "next/navigation";

import Link from "next/link";

import { toast } from "react-toastify";

import { useForm } from "react-hook-form";

import * as icons from "react-icons/fa";

import * as _auth from "@/api/auth.api";

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

	const onSubmit: SubmitHandler<ILoginData> = (data) => {
		_auth.login(data)
			.then(request => {
				localStorage.setItem("token", request.data.token);

				router.push("/explore/tracks");
			})
			.catch((error: any) => {
				toast.error(error.response?.data.error ??
					"Generic error, try again later...");
			});
	};

	return (
		<div className="flex items-center justify-center xs:mt-8 sm:mt-20 text-spotify-white">
			<form
				className="w-full max-w-lg px-5"

				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="text-center xs:mb-7 sm:mb-10 text-white">
                	<h1 className="xs:text-5xl sm:text-6xl font-bold -skew-y-3 bg-spotify-green">
						SNM ♪
					</h1>

                	<h3 className="xs:text-base sm:text-xl font-semibold -skew-y-3">
						Log in to explore our awesome playlists!
					</h3>
				</div>

				<div className="mb-5">
					<label className="inline-block text-base mb-2">
						<icons.FaUser className="inline -mt-1 mr-1" /> E-mail
					</label>

					<input
						type="text"
						placeholder="nome@dominio.com"
						className="w-full bg-spotify-gray outline-none 
							hover:ring-white hover:ring-2 rounded-full px-3.5 py-2
							text-base text-white placeholder:text-spotify-lightergray"

						{...register("email")}
					/>
				</div>

				<div className="mb-5">
					<label className="inline-block text-base mb-2">
						<icons.FaKey className="inline -mt-1 mr-1" /> Password
					</label>

					<input
						type="password"
						placeholder="••••••••••••"
						className="w-full bg-spotify-gray outline-none 
                            hover:ring-white hover:ring-2 rounded-full px-3.5 py-2
                            text-base text-white placeholder:text-spotify-lightergray"

						{...register("password")}
					/>
				</div>

				<div className="flex items-center mb-4">
					<input
						type="checkbox"
						className="w-4 h-4 rounded accent-spotify-green"
						{...register("rememberMe")}
					/>

					<label className="ml-2 text-sm">
						Remember me
					</label>
				</div>

				<div className="mb-5">
					<button
						type="submit"

						className="w-full text-xl text-white font-bold px-4 py-2
							leading-tight bg-spotify-green hover:bg-spotify-darkgreen 
							active:bg-spotify-darkgreen rounded-full "
					>
						Log in
					</button>
				</div>

				<hr className="mb-4 h-px bg-spotify-white bg-opacity-25 border-0" />

				<div className="text-center">
					<Link href="/registration" className="text-sm text-spotify-green font-semibold underline">
						Don't have an account yet? Join us now!
					</Link>
				</div>
			</form>
		</div>
	);
}
