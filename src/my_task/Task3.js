import react, { useEffect, useState } from 'react'
import axios from 'axios';
function Task3() {
    const [posts, setPosts] = useState([])
    const [searchItem, setSearchItem] = useState('')
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then((response) => {
                console.log(response)
                setPosts(response.data)
            }).catch((err) => console.log(err))
    }, [])
    //     const filteredData = searchItem ? posts.filter((item) =>
    //     Object.values(item)?.some((value) =>
    //         value.toString().toLowerCase().includes(searchItem.toLowerCase())
    //     )
    // ) : posts;

    const filterdData = searchItem ? posts.filter((item) =>
        Object.values(item)?.some((value) => value.toString().toLowerCase()?.includes(searchItem?.toLowerCase())
        )) : posts
    console.log("bsxvhghjgf", filterdData)

    return (
        <div>

            <input type='search' onChange={(e) => setSearchItem(e.target.value)} placeholder='searching....'></input>
            <table>
                <thead>
                    <th>UserId</th>
                    <th>Body</th>
                    <th>Titile</th>
                    <th>ID</th>
                </thead>
                <tbody>
                    {
                        // filterdData.map((row,index)=>)
                        filterdData.map((row, index) =>
                            <tr key={index}>
                                <td>{row.userId}</td>
                                <td>{row.body}</td>
                                <td>{row.title}</td>
                                <td>{row.id}</td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )

}
export default Task3;