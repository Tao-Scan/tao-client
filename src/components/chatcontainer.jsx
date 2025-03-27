import { Fragment, useEffect, useRef, useState } from "react";
import { getChatBubbleRadius, smoothScrollToRef } from "../libs/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import config from "../libs/config";
import { createFetcher } from "../libs/fetcher";

export default function ChatContainer({ auth, sentMsgs, status, setProcessing }) {
	const lastMessageRef = useRef();

	const [fetchParams, setFetchParams] = useState({
		page: 1,
		size: 50,
	});

	const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isError, isLoading, isPending, isSuccess } =
		useInfiniteQuery({
			queryKey: [config.endpoints.getMessages, fetchParams],

			queryFn: async ({ pageParam }) => {
				const p = {
					page: pageParam.page,
					size: pageParam.size,
				};

				const searchStr = new URLSearchParams(p).toString();

				const res = await createFetcher({
					url: `${config.endpoints.getMessages}`,
					method: "GET",
					surfix: `?${searchStr}`,
					auth,
				})();

				return res;
			},

			initialPageParam: {
				...fetchParams,
			},

			getNextPageParam: (lastPage, pages, lastPageParam) => {
				if (lastPage.items.length === 0) {
					return undefined;
				}

				return { ...lastPageParam, page: lastPageParam.page + 1 };
			},

			getPreviousPageParam: (firstPage, pages, firstPageParam) => {
				if (firstPageParam.page <= 1) {
					return undefined;
				}
				return {
					...firstPageParam,
					page: firstPageParam.page - 1,
				};
			},

			refetchInterval: 0,

			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		});

	useEffect(() => {
		smoothScrollToRef(lastMessageRef);
	}, [sentMsgs, data]);

	return (
		<div className=" pt-4  space-y-10 overflow-y-auto no-scrollbar h-full w-full">
			{data &&
				data.pages.map((page, i) => {
					return (
						<Fragment key={i}>
							{page?.items &&
								page.items.map((item, j) => {
									return (
										<div
											key={j}
											className="flex flex-col justify-center items-start  space-y-8 w-full text-left leading-8 font-medium "
										>
											{item.content && <UserMessage content={item.content} />}

											{item.reply && <AssistantMessage content={item.reply} />}
										</div>
									);
								})}

							{sentMsgs &&
								sentMsgs.map((msg, k) => {
									return (
										<div
											key={k}
											className="flex flex-col justify-center items-start  space-y-8 w-full text-left leading-8 font-medium "
										>
											<UserMessage content={msg.query} />

											{msg.reply && <AssistantMessage content={msg.reply} />}
										</div>
									);
								})}

							<TypingIndicator {...status} />

							<div className="pb-32" ref={lastMessageRef}></div>
						</Fragment>
					);
				})}
		</div>
	);
}

function UserMessage({ content }) {
	const ref = useRef();

	const borderRadius = getChatBubbleRadius(content, true, true, false, ref);
	return (
		<div
			style={{
				borderRadius,
			}}
			ref={ref}
			className="self-end inline-block  bg-[#17082B] backdrop-blur-lg py-4 px-6 "
		>
			{content}
		</div>
	);
}

function AssistantMessage({ content }) {
	const ref = useRef();

	return (
		<div ref={ref} className="self-start inline-block ">
			{content}
		</div>
	);
}

function TypingIndicator({ processing, calledTool }) {
	const [showCursor, setShowCursor] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setShowCursor((prev) => !prev);
		}, 500); // Blink every 500ms

		return () => clearInterval(interval);
	}, []);

	// console.log("Processing: ", processing);

	if (!processing) return null;

	return (
		<div className="self-start">
			<div className="flex items-center space-x-2 font-mono text-lg">
				<span className="w-3 h-3 bg-black dark:bg-white rounded-full animate-pulse"></span>

				{calledTool ? (
					<span className="text-gray-400 italic text-sm animate-pulse"> looking up sources... </span>
				) : (
					<span
						className={`w-2 rounded-sm h-5 bg-black dark:bg-white ${showCursor ? "opacity-100" : "opacity-0"}`}
					></span>
				)}
			</div>
		</div>
	);
}
