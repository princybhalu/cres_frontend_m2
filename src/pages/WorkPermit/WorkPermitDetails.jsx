import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // For image modal
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getOneProgessDetails } from "../../services/api/project";
import Loading from "../../components/shared/Loading";
import { PLATFORM_USERS } from "../../utils/enums";
import { chnageStatusOfProgress, addCommentsOfProgress } from "../../services/api/progress";
import { getUsersListByIds } from "../../services/api/user";
import { useCookies } from 'react-cookie'

Modal.setAppElement('#root'); // Modal setup

const ProgressDetails = () => {
    const { projectId, progressId } = useParams();
    const user = useSelector((state) => state.user.user);
    const userRole = user.role;
    const [status, setStatus] = useState("Pending");
    const [selectedImage, setSelectedImage] = useState(null); // To open image modal
    const [isOfficer, setIsOfficer] = useState(userRole === PLATFORM_USERS.OFFICER);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]); // Initial comments data
    const [images, setImages] = useState([]); // Initial images data
    const [progres, setProgres] = useState(null);
    const [loading, setLoading] = useState(true);
    const project = useSelector((state) => state.project.project);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['user_id']);

    // Handle status change (only for officers)
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    // Submit status change (officer only)
    const handleStatusSubmit = async () => {
        try {
            let reqbody = {
                status,
                progress_id: progressId,
            };
            const response = await chnageStatusOfProgress(reqbody, projectId);
            console.log('Status updated:', response.data);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    // Add a new comment
    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try {
            let reqbody = {
                comment: newComment,
                progress_id: progressId,
            };
            let { data } = await addCommentsOfProgress(reqbody, projectId);
            let userids = data.comments?.map(({ user_id }) => user_id);
            let { data: usersData } = await getUsersListByIds({
                ids: userids
            });
            console.log({ usersData });
            console.log(usersData[0].firstname);

            let newComments = data.comments.map((com, index) => {
                let name = usersData.find(({ id }) => id === com.user_id)?.firstname;
                return { ...com, userName: name }
            });
            setComments([...newComments]); // Append new comment
            setNewComment('');
        } catch (error) {
            console.log('Error adding comment:', error);
        }
    };

    // Open image in modal
    const openImageModal = (imageUrl) => {
        setSelectedImage(imageUrl[0] === '{' ? imageUrl.slice(1, imageUrl.length - 1) : imageUrl);
    };

    // Close image modal
    const closeImageModal = () => {
        setSelectedImage(null);
    };

    const getProgressData = async () => {
        try {
            let { data } = await getOneProgessDetails(progressId, projectId);
            console.log("data : ", data);
            setImages(data?.media != null ? data.media : []);
            setProgres(data);
            setStatus(data.status);

            let userids = data.comments?.map(({ user_id }) => user_id);
            let usersData;
            if (userids.length > 0) {
                let dataOfUser = await getUsersListByIds({
                    ids: userids
                });
                usersData = dataOfUser.data;

                console.log({ usersData });
                console.log(usersData[0].firstname);

                let newComments = data.comments.map((com, index) => {
                    let name = usersData.find(({ id }) => id === com.user_id)?.firstname;
                    return { ...com, userName: name }
                });
                setComments(newComments ?? []);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProgressData().then();
    }, []);

    // Function to trigger file selection
    const handleClick = () => {
        document.getElementById("mypic").click();
    };

    const handleSelectedImage = () => {
        try {
            //TODO : ADD IMAGE


        } catch (err) {
            console.log("errr");

        }
    }


    return (
        <>
            {loading && progres === null && <> <Loading /> </>}

            {!loading && progres === null && <> <div className='bg-red-300 p-4 rounded m-4'>
                Some things goes Wrong
            </div> </>}

            {!loading && progres !== null && <>
                <div className="mx-auto mt-8 p-6">
                    {/* header */}
                    <div className='bg-[var(--take-lighter)] p-3'>

                        {/* navigation */}
                        <div className="mb-6">
                            <div className="flex text-gray-500 gap-2 text-sm mb-4">
                                <span onClick={() => navigate("/")}>Home</span>
                                <span>/</span>
                                <span onClick={() => navigate("/project/" + project.id)}>{project.name}</span>
                                <span>/</span>
                                <span onClick={() => navigate("/project/" + project.id + "/workpermit")} >Work Permit List</span>
                                <span>/</span>
                                <span className='text-black' >Work Permit Details</span>
                            </div>
                        </div>


                        {/* Status Section */}
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <div className="font-semibold text-2xl">{progres.title}</div>
                                <div className="text-gray-600 mb-2">Create At: {new Date(progres.created_at).toLocaleDateString()}</div>
                            </div>
                            <div className='px-4'>
                                <div className="text-lg">Status : </div>
                                {isOfficer ? (
                                    <div className="flex items-center space-x-2">
                                        <select
                                            value={status}
                                            onChange={handleStatusChange}
                                            className="p-2 border border-gray-300 rounded"
                                        >
                                            <option value="approved">Approved</option>
                                            <option value="pending">Pending</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                        <button
                                            onClick={handleStatusSubmit}
                                            className="bg-[var(--navbar-bg)] text-[var(--navbar-text)] rounded p-2"
                                        >
                                            Update
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-lg font-semibold">{status}</div>
                                )}
                            </div>

                        </div>
                    </div>


                    {/* Image Section */}
                    <div className="mt-6">
                        <div className='flex justify-between '>
                            <div className="text-xl font-semibold mb-4">Images</div>
                            <div>
                                {/* <button className="bg-[var(--navbar-bg)] text-[var(--navbar-text)] rounded mr-24 p-2 "
                                    onClick={() => console.log("done")
                                    }> Add Images </button> */}
                                <div style={{ position: "relative", display: "inline-block" }}>
                                    {/* SVG Camera Icon */}
                                    <div style={{ position: "relative", display: "inline-block" }}>
                                        {/* Hidden File Input */}
                                        <input
                                            type="file"
                                            id="mypic"
                                            accept="image/*"
                                            onChange={handleSelectedImage}
                                            style={{ display: "none" }} // Hide the input field
                                        />

                                        {/* Camera Icon as the clickable upload button */}
                                        <label onClick={handleClick} style={{ cursor: "pointer" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                                                <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                                            </svg>

                                        </label>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={image[0] === '{' ? image.slice(1, image.length - 1) : image}
                                        alt={`Progress ${index}`}
                                        onClick={() => openImageModal(image)}
                                        className="w-full h-32 object-cover rounded cursor-pointer"
                                    />
                                </div>
                            ))}
                            {images.length === 0 && <><div className="relative"> Not Any Image Found
                            </div></>}
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-6">
                        <div className="text-xl font-semibold mb-4">Comments</div>
                        <div className="space-y-4">
                            {comments.map((comment, index) => (
                                <div
                                    key={index}
                                    className={`flex items-start space-x-3 ${comment.user_id === cookies.user_id ? 'justify-end' : ''}`}
                                >
                                    <div className="flex-shrink-0">
                                        <div className="h-8 w-8 rounded-full bg-gray-500 text-white flex items-center justify-center">
                                            {comment.userName?.[0]}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-100 rounded-lg max-w-xs">
                                        <div className="text-xs text-gray-500 mt-1">{comment.userName}</div>
                                        <p className="text-sm text-gray-800">{comment.comment}</p>
                                        <div className="text-xs text-gray-500 mt-1">{new Date(comment.time).toLocaleTimeString()}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Comment */}
                        <div className="mt-4 border border-gray-300 rounded  flex">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="p-2 w-full"
                            />
                            <button
                                onClick={handleAddComment}
                                className=" bg-green-500 text-white px-4 p-2 rounded"
                            >
                                Send
                            </button>
                        </div>
                    </div>

                    {/* Image Modal */}
                    {selectedImage && (
                        <Modal isOpen={true} onRequestClose={closeImageModal} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-4 rounded shadow-lg max-w-4xl">
                                <img src={selectedImage} alt="Selected" className="w-full h-auto" />
                                <button onClick={closeImageModal} className="mt-4 text-blue-600 underline">
                                    Close
                                </button>
                            </div>
                        </Modal>
                    )}
                </div></>}

        </>

    );
};

export default ProgressDetails;
