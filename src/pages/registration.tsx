import { useRouter } from "next/navigation";

import Link from "next/link";

import { toast } from "react-toastify";

import { useForm } from "react-hook-form";

import * as icons from "react-icons/fa";

import * as _users from "@/api/users.api";

import type { SubmitHandler } from "react-hook-form";

import type { IPostData } from "@/api/users.api";

export default function Registration() {
	const router = useRouter();

	const {
		register,

		handleSubmit
	} = useForm<IPostData>();

	const onSubmit: SubmitHandler<IPostData> = (data) => {
		_users.post(data)
			.then((_) => {
				toast.success("Registration successful! \
                    Log in now to access your account.");

				router.push("/");
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
						Join our amazing playlists community!
					</h3>
				</div>

				<div className="mb-5">
					<label className="text-base">
						<icons.FaEnvelope className="inline -mt-1 mr-1" /> E-mail
					</label>

					<input
						type="text"
						placeholder="john.doe@hotmail.com"
						className="w-full bg-spotify-gray outline-none mt-2
							hover:ring-white hover:ring-2 rounded-full px-3.5 py-2
							text-base text-white placeholder:text-spotify-lightergray"

						{...register("email")}
					/>
				</div>

                <div className="mb-5">
					<label className="text-base">
						<icons.FaUser className="inline -mt-1 mr-1" /> Username
					</label>

					<input
						type="text"
						placeholder="John Doe"
						className="w-full bg-spotify-gray outline-none mt-2
							hover:ring-white hover:ring-2 rounded-full px-3.5 py-2
							text-base text-white placeholder:text-spotify-lightergray"

						{...register("username")}
					/>
				</div>

				<div className="mb-6">
					<label className="text-base">
						<icons.FaKey className="inline -mt-1 mr-1" /> Password
					</label>

					<input
						type="password"
						placeholder="••••••••••••••••"
						className="w-full bg-spotify-gray outline-none mt-2 
                            hover:ring-white hover:ring-2 rounded-full px-3.5 py-2
                            text-base text-white placeholder:text-spotify-lightergray"

						{...register("password")}
					/>
				</div>

				<div className="mb-5">
					<button
						type="submit"

						className="w-full text-xl text-white font-bold px-4 py-2
							leading-tight bg-spotify-green hover:bg-spotify-darkgreen 
							active:bg-spotify-darkgreen rounded-full "
					>
						Join us now!
					</button>
				</div>

				<hr className="mb-3.5 h-px bg-spotify-white bg-opacity-25 border-0" />

				<div className="text-center">
					<Link href="/" className="text-sm text-spotify-green font-semibold underline">
						Already have an account? Log in now!
					</Link>
				</div>
			</form>
		</div>
	);
}
