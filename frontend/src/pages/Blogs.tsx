import { BlogCard } from "../components/BlogCard"
import { Header } from "../components/Header"

export const Blogs = ()=>{
    return(
        <div>
            <div>
                <Header />
            </div>
            <div className="flex justify-center">
            <div className="max-w-2xl">
                <BlogCard authorName="sdq" publishedDate="2nd Feb 2024" title="Hey wassup" content="jewfwefuewjfm,h ;udhwdnw djh09u8  yqwidhqwjhiqwrh uqwimkqwn uywq jwqhjfhuf iufqwnbf  uiyqwf  uiwyqfbf iuywqjqw  diuqfbnq hjbhguysafdjghdqw djhhgdiuqw duiywdqw duiyqd qwdnbdiqwudjq   iudyqjdb q    d   qdiuy   qe q    n qeu   u   eu  eu  qgeh    qge dui qhdbhgq hydgq    dugdhq dg  qhg q gdq   hgdyuq  ge  yhveq   s   qhgeqhgyq    sq ygwq    wgq vq   syg    qyu gw  bh q"/>
                <BlogCard authorName="sdq" publishedDate="2nd Feb 2024" title="Hey wassup" content="jewfwefuewjfm,h ;udhwdnw djh09u8  yqwidhqwjhiqwrh uqwimkqwn uywq"/>
                <BlogCard authorName="sdq" publishedDate="2nd Feb 2024" title="Hey wassup" content="jewfwefuewjfm,h ;udhwdnw djh09u8  yqwidhqwjhiqwrh uqwimkqwn uywq"/>
                <BlogCard authorName="sdq" publishedDate="2nd Feb 2024" title="Hey wassup" content="jewfwefuewjfm,h ;udhwdnw djh09u8  yqwidhqwjhiqwrh uqwimkqwn uywq"/>
                <BlogCard authorName="sdq" publishedDate="2nd Feb 2024" title="Hey wassup" content="jewfwefuewjfm,h ;udhwdnw djh09u8  yqwidhqwjhiqwrh uqwimkqwn uywq"/>
            </div>
            </div>
        </div>
    )
}