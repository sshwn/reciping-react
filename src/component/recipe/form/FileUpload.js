import React, { useState } from 'react';

const FileUpload = ({ stepId }) => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        setFiles([...files, ...event.target.files]);
    };

    return (
        <div>
            <input
                type="file"
                id={`file-upload-${stepId}`}
                style={{ display: 'none' }}
                multiple
                onChange={handleFileChange}
            />
            <button
                type="button"
                onClick={() => document.getElementById(`file-upload-${stepId}`).click()}
                className="btn-sm btn-default"
            >
                순서사진 한번에 넣기
            </button>
            {files.length > 0 && (
                <div>
                    {files.map((file, index) => (
                        <div key={index} className="file-preview">
                            <img src={URL.createObjectURL(file)} alt={`file-${index}`} width="100" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
