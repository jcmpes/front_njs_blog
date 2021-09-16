import Navbar from "../layout/Navbar"
import Article from "./Article"

export default function PostList({ posts }) {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 space-x-5 space-y-5">
                {posts.map((item) => (
                    <Article
                        body={item.body}
                        title={item.title}
                        userId={item.userId}
                        key={item.pk}
                    />
                ))}
            </div>
        </div>
    )
}