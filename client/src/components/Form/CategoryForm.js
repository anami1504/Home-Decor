import React from 'react'

function CatrgoryForm({ handleSubmit, value, setValue }) {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">

                    <input
                        type="text"
                        className="form-control"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder='Create new category'
                    />

                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

        </>
    )
}

export default CatrgoryForm