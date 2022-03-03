import fetcher from "../../lib/fetcher";
import { GET_SINGLE_POST, GET_ALL_SLUGS } from "../../lib/wordpress/posts";
import { useRouter } from "next/router";

export default function single_post({ postData }) {
	const { id, title, content, slug } = postData.post;
	const router = useRouter();

	if (!router.isFallback && !slug) {
		return <ErrorPage statusCode={404} />;
	}
	return <>{router.isFallback ? <h1>ładuje</h1> : <h1>załadowane</h1>}</>;
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
