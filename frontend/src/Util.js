
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

export function updateUser(component){

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
    updateUser(component)
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