import React, { SetStateAction} from "react"

interface ErrorType {
    msg: string,
    isError: boolean
}

interface BookFileProps {
    selectedFile: File | null
    setSelectedFile: React.Dispatch<SetStateAction<File | null>>,
    errors: Map<string, ErrorType | null>
}


const transformName = (selectedFileName: string) => {
    const nameSplit = selectedFileName.split(".")
    const newName = `${nameSplit[0].slice(0,10)}...` + nameSplit[1]
    return newName
}
const BookFile: React.FC<BookFileProps> = ({selectedFile, setSelectedFile, errors}) => {

    return(
        <>
            <div className="file-input-content">
                <label htmlFor="refImage">Upload</label>
                <label htmlFor="refImage" className={errors?.get("file")?.isError? "input-error file-input-label": "file-input-label"}>
                    {selectedFile? transformName(selectedFile.name) : "Click to upload image"}
                </label>
                {errors?.get("file")?.isError && <p className="input-message-error">*{errors?.get("file")?.msg}</p>}
                <input type="file" className="file-input" id="refImage" onChange={(e) => setSelectedFile(e.target.files?.length? e.target.files[0] : null)}/>
            </div>
        </>
    )
}

export default BookFile