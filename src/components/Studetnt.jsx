import { useState } from "react";

function Student() {
    const [formData, setFormData] = useState({ username: "", email: "", number: "" });
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit !==null) {
            const updateData = data.map((item,index)=> index === edit ? formData : item);
            setData(updateData);
            setEdit(null);
        } else {
            setData([...data, formData])
        }
        setFormData({ username: "", email: "", number: "" });
    }

    const handleDelete = (index) => {
        const filteredData = data.filter((_, i) => i !== index);
        setData(filteredData);
    }

    const handleEdit = (index) => {
        setFormData(data[index]);
        setEdit(index);

    }

const handleDisabled = () =>{
    return (
        !formData.username.trim() || !formData.email.trim() || !formData.number.trim()
    )
}


    console.log(data);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="enter your name" name="username" value={formData.username} onChange={handleChange} /><br />
                <input type="text" placeholder="enter your email" name="email" value={formData.email} onChange={handleChange} /><br />
                <input type="text" placeholder="enter your number" name="number" value={formData.number} onChange={handleChange} /><br />
                <button type="submit" disabled={handleDisabled()}>{edit !== null ? "update" : "submit"}</button>
            </form>



            <div>
                {data && data.map((obj, index) => <div key={index}>
                    <p>{obj.username}</p>
                    <p>{obj.email}</p>
                    <p>{obj.number}</p>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                </div>)}
            </div>
        </>


    )
}

export default Student;