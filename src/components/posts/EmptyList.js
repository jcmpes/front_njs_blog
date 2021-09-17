import Link from 'next/link';


const EmtpyList = () => {
    return (
        <div className="flex-col w-full text-center mt-20">
            <h1 className="self-center font-bold text-2xl">There are no posts yet</h1>
            <Link href="new-post/">
                <a className="text-green-400">Want to create your first post?</a>
            </Link>
        </div>
    )
}

export default EmtpyList;