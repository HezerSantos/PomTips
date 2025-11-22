import React, { SetStateAction} from "react"

interface BookFileProps {
    selectedFile: File | null
    setSelectedFile: React.Dispatch<SetStateAction<File | null>>
}


const transformName = (selectedFileName: string) => {
    const nameSplit = selectedFileName.split(".")
    const newName = `${nameSplit[0].slice(0,10)}...` + nameSplit[1]
    return newName
}
const BookFile: React.FC<BookFileProps> = ({selectedFile, setSelectedFile}) => {

    return(
        <>
            <div>
                <label htmlFor="refImage" className="file-input-label">
                    Image
                    <p>
                        <span>{selectedFile? transformName(selectedFile.name) : "Click to upload image"}</span>
                    </p>
                </label>
                <input type="file" className="file-input" id="refImage" onChange={(e) => setSelectedFile(e.target.files?.length? e.target.files[0] : null)}/>
            </div>
        </>
    )
}

export default BookFile