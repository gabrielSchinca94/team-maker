export const uploadFile = async(file) => {
    console.log('file', file)

    if(!file?.file) throw new Error('No file to upload!');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dtz1du5tn/image/upload';

    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('upload_preset', 'AwesomeProject');

    try{

        const resp = await fetch(cloudUrl, {
            method:'POST',
            body:formData,
        });

        console.log(resp);

        if( !resp.ok) throw new Error('Could not upload file')

        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    }catch(error){
        throw new Error(error.message);
    }
}