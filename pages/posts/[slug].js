import React from "react";
import { useState } from "react/cjs/react.development";
import Router from "next/router";
import fetcher from "../../lib/fetcher";
import { GET_SINGLE_POST, GET_ALL_SLUGS } from "../../lib/wordpress/posts";
import { useRouter } from "next/router";

export default function single_post({ postData }) {
	// const { id, title, content, slug } = postData.post;
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	Router.events.on("routeChangeStart", (url) => {
		setLoading(true);
	});

	Router.events.on("routeChangeComplete", (url) => {
		setLoading(false);
	});
	console.log(Router);
	// if (!router.isFallback && !slug) {
	// 	return <ErrorPage statusCode={404} />;
	// }
	return <>{loading ? <h1>LOADING</h1> : <h1>ZAŁADOWANE</h1>}</>;
}

export async function getStaticPaths() {
	const response = await fetcher(GET_ALL_SLUGS);
	const allPostsSlugs = response.posts.edges;

	return {
		paths: allPostsSlugs.map((singleSlug) => `/posts/${singleSlug.node.slug}` || []),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const variables = {
		id: params.slug,
	};
	const data = await fetcher(GET_SINGLE_POST, { variables });
	return {
		props: {
			postData: data,
		},
	};
}
