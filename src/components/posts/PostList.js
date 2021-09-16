import React, { useEffect, useState } from "react"
import compareValues from "../../utils/compareValues";
import Navbar from "../layout/Navbar"
import Article from "./Article"
import Filters from "./Filters"

export default function PostList({ posts }) {
    const [filters, setFilters] = useState({
        filter: 'date',
        ordering: 'asc'
    });

    useEffect(() => {
        posts.sort(compareValues(filters.filter, filters.ordering));
        console.log(posts)
      }, [filters]);

    return (
        <div className="max-w-5xl mx-auto">
            <Filters filters={filters} setFilters={setFilters} />
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