
import axios from 'axios';

export const format = (res) => {
    //return formatted string for image parsing
    const [file, chunks] = [res.data.file, res.data.chunks];
    chunks.sort((a,b) => a.n - b.n);
    let imageData = chunks.reduce((acc, cur) => {
       return acc + cur.data;
    }, '');
    return `data:${file.contentType};base64,${imageData}`;
}

export function updateUsers(component){

    return new Promise( (resolve, reject) => {
        axios.get('http://localhost:5000/get')
        .then(res => {
            const users = res.data;
            Promise.all(
                users.map(user => {
                    return axios.get('http://localhost:5000/get/profile', {
                        params:{_id: user.profile}
                    });
                })
            )
                .then(resolved => {
                    resolved.forEach(resolve => {
                        const file = resolve.data.file;
                        users[res.data.findIndex(user => user.profile === file._id)]
                            .image = format(resolve);
                    })
                    component.setState({
                        users: users
                    });
                    return resolve('success');
                })
                .catch(err => reject(err));
        })
        .catch(err => reject(err));
    })
   
}

export function updateBlogs(component){
    updateUsers(component)
        .then(() => {
            axios.get('http://localhost:5000/get/blogs')
                .then(res => {
                    let blogs = res.data.sort((a, b) => a.createdAt - b.createdAt);
                    component.setState({
                        blogs: blogs
                    })
                })
        })
}

export function updateProfile(component, user){
    console.log(user);
    axios.get('http://localhost:5000/get/profile', {
        params: {_id: user.profile}
    })
        .then(res => {
           user.image = format(res);
           console.log(user);
            component.setState({
                user: user
            })
        })
}


export function updateUserBlogs(component, user){

    let blogs = user.blogs.map(blog => {
        return axios.get('http://localhost:5000/get/blog', {
            params: {id: blog}
        })
    })
    Promise.all(blogs)
        .then(resolved => {
            blogs = resolved.map(resolve => resolve.data);
            component.setState({
                blogs: blogs,
                user: user
            },updateProfile(component, user) )
            
        })
}