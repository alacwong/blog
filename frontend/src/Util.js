
import axios from 'axios';
import avatar from './components/profile/default.png'

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
                            .profile = format(resolve);
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

export function updateProfile(component){
    axios.get('http://localhost:5000/get/profile', {
        params: {_id: component.state.user.profile}
    })
        .then(res => {
            const src = format(res);
            component.setState({
                image: src
            })
        })
}

export function updateUser(component, user, cb){
    component.setState({
        user: user
    })
    cb(component);
}

export function updateUserBlogs(component){

    let blogs = component.state.user.blogs.map(blog => {
        return axios.get('http://localhost:5000/get/blog', {
            params: {id: blog}
        })
    })
    Promise.all(blogs)
        .then(resolved => {
            blogs = resolved.map(resolve => resolve.data);
            component.setState({
                blogs: blogs
            })
            console.log(component.state.blogs);
        })
}