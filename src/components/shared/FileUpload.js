function FileUpload({ postData, setPostData }) {
    const handleChange = (ev) => {
      // set course image
        setPostData((prevState) => ({
          ...prevState,
          image: ev.target.files[0],
          preview: { file: URL.createObjectURL(ev.target.files[0]) }
        }));
      
    };
    
    return (
      <div className="ml-5 mb-10">
        <br />
        <label
            className="w-64 flex flex-col items-center px-4 py-6 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150">
            <input type='file' class="hidden" onChange={handleChange}/>
            {postData.preview
                ? <img 
                alt={''}
                style={{ height: '200px' }}
                src={ postData.preview.file }
                />
                : null
                }
            <span class="mt-2 text-base leading-normal">Select a file</span>
            
        </label>
        
        
      </div>
    );
  }
  
  export default FileUpload;