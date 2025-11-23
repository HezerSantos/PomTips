import React, { SetStateAction} from "react"

interface ErrorType {
    msg: string,
    isError: boolean
}

interface BookFileProps {
    selectedFile: File | null
    setSelectedFile: React.Dispatch<SetStateAction<File | null>>,
    error: ErrorType | null
}


const transformName = (selectedFileName: string) => {
    const nameSplit = selectedFileName.split(".")
    const newName = `${nameSplit[0].slice(0,10)}...` + nameSplit[1]
    return newName
}
const BookFile: React.FC<BookFileProps> = ({selectedFile, setSelectedFile, error}) => {

    return(
        <>
            <div className="file-input-content">
                <label htmlFor="refImage">Upload</label>
                <label htmlFor="refImage" className="file-input-label">
                    {selectedFile? transformName(selectedFile.name) : "Click to upload image"}
                </label>
                {error?.isError && <p className="input-message-error">*{error.msg}</p>}
                <input type="file" className="file-input" id="refImage" onChange={(e) => setSelectedFile(e.target.files?.length? e.target.files[0] : null)}/>
            </div>
        </>
    )
}

export default BookFile