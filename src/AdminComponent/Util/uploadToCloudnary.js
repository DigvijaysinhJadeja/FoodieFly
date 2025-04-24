
const upload_preset="FoodieFly"
const cloud_name = "dkwrtinkc"
const api_url = `https://api.cloudinary.com/v1_1/dkwrtinkc/image/upload`

// the below function is to add image into the cload Storage and the name ofthe cloud storage is cloudnary
export const uploadImageToCloudnary = async(file) => {
    const data = new FormData();
    data.append("file",file);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const res = await fetch(api_url,{
        method:"post",
        body:data
    })

    const fileData = await res.json();
    return fileData.url;
}