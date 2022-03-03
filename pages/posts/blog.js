import fetcher from "../../lib/fetcher";
import { GET_ALL_POSTS } from "../../lib/wordpress/posts";
import Link from "next/link";

export default function blog({ allPosts }) {
	return (
		<>
			{allPosts.map((singlePost) => {
				const { id, title, excerpt, slug } = singlePost.node;
				return (
					<section key={id}>
						<h1>{title}</h1>
						<div dangerouslySetInnerHTML={{ __html: excerpt }}></div>
						<h6>Link: {slug}</h6>
						<Link href={`/posts/${slug}`}>
							<a>{slug}</a>
						</Link>
					</section>
				);
			})}
		</>
	);
}

export async function getStaticProps() {
	const response = await fetcher(GET_ALL_POSTS);
	const allPosts = response.posts.edges;
	return { props: { allPosts } };
}
