import matter from 'gray-matter'
import Link from 'next/link'

const Blog = (props) => {
    console.log(props)
    return (
        <>
            <h1>ブログページ</h1>
            {props.blogs.map((blog, index) => 
                <div key={index}>
                    <h3>{blog.fromtmatter.title}</h3>
                    <p>{blog.fromtmatter.dare}</p>
                    <Link href={`/blog/${blog.slug}`}><a>Reed More</a></Link>
                </div>
            )}
        </>
    )
}

export default Blog

export async function getStaticProps() {
    const blogs = (context => {
        const keys = context.keys()
        const values = keys.map(context)
        const data = keys.map((key, index) => {
            let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
            const value = values[index]
            const document = matter(value.default)
            return {
                fromtmatter: document.data,
                slug: slug
            }
        })
        return data

    })(require.context('../data', true, /\.md$/))

    const orderedBlogs = blogs.sort((a, b) => {
        return b.fromtmatter.id - a.fromtmatter.id
    })

    return {
        props: {
            blogs: JSON.parse(JSON.stringify(orderedBlogs))
        },
    }
}