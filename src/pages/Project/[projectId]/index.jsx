import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector } from "react-redux";
import { PLATFORM_USERS } from "../../../utils/enums";
import ResourceIcon from '../../../assets/icons/Resource-icon';
import WorkPermitIcon from "../../../assets/icons/WorkPermit-icon";
import ProgrssIcon from "../../../assets/icons/Progress-icon";
import MembersIcon from '../../../assets/icons/Members-icon';
import { getOneProjectData } from "../../../services/api/project";
import { useParams } from 'react-router-dom';
import Loading from  "../../../components/shared/Loading";
import { useNavigate } from "react-router-dom";
import {addProject} from "../../../store/projectsSlice";    


const CARDS_CONFIG = [
    {
        id: 'resource',
        title: 'Resource',
        color: 'green',
        icon: <ResourceIcon />,
        allowedRoles: [PLATFORM_USERS.OFFICER, PLATFORM_USERS.ARCHITECT, PLATFORM_USERS.CONTRACTOR, PLATFORM_USERS.DEALER, PLATFORM_USERS.WORKER]
    },
    {
        id: 'progress',
        title: 'Progress',
        color: 'blue',
        icon: <ProgrssIcon />,
        allowedRoles: [PLATFORM_USERS.OFFICER, PLATFORM_USERS.CONTRACTOR, PLATFORM_USERS.DEALER, PLATFORM_USERS.WORKER]
    },
    {
        id: 'members',
        title: 'Members',
        color: 'red',
        icon: <MembersIcon />,
        allowedRoles: [PLATFORM_USERS.OFFICER, PLATFORM_USERS.CONTRACTOR, PLATFORM_USERS.DEALER]
    },
    {
        id: 'workpermit',
        title: 'Work Permit',
        color: 'purple',
        icon:  <WorkPermitIcon />,
        allowedRoles: [PLATFORM_USERS.OFFICER, PLATFORM_USERS.DEALER]
    }
];

const NavigateCard = ({ icon, title, color, onClick }) => {
    const colorClasses = {
        green: 'bg-emerald-500 hover:bg-emerald-600',
        blue: 'bg-blue-500 hover:bg-blue-600',
        red: 'bg-red-500 hover:bg-red-600',
        purple: 'bg-purple-500 hover:bg-purple-600'
    };

    return (
        <div
            onClick={onClick}
            className={`${colorClasses[color]} rounded-xl p-4 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[100px] transform hover:scale-105`}
        >
            <div className="text-white mb-4">
                {icon}
            </div>
            <h3 className="text-white text-xl font-medium">{title}</h3>
        </div>
    );
};

const ProjectOverview = () => {
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const userRole = useSelector((state) => state.user.user.role);
    const [ProjectDetails, setProjectDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getVisibleCards = () => {
        return CARDS_CONFIG.filter(card => card.allowedRoles.includes(userRole));
    };

    const getProjectData = async () => {
        try {
            const { data } = await getOneProjectData(projectId);
            setProjectDetails(data);
            const newProject = {
                id: projectId,
                name: data.name,
                location: data.location,
              };
              dispatch(addProject(newProject));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        getProjectData().then();
    }, [])

    const handleCardClick = (cardId) => {
        console.log(`Clicked ${cardId}`);
        navigate(`/project/${projectId}/${cardId}`)
    };

    return (
        <>
            {loading && ProjectDetails === null && <> <Loading />  </>}

            {!loading && ProjectDetails === null && <> <div className='bg-red-300 p-4 rounded m-4'>
                Some things goes Wrong
            </div> </>}

            {!loading && ProjectDetails !== null && <>
                <div className="p-6">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-gray-600 mb-6">    
                        <span onClick={() => navigate("/")} >Home</span>
                        <span>/</span>
                        <span className='text-black'>General details of {ProjectDetails.name}</span>
                    </div>

                    {/* Project Details */}
                    <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-bold">{ProjectDetails.name}</h1>
                            <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => navigate("/")}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-600 mb-4">
                            {ProjectDetails.description}
                        </p>
                        <div className="flex items-center text-gray-600">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{ProjectDetails.location}</span>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {getVisibleCards().map(card => (
                            <NavigateCard
                                key={card.id}
                                title={card.title}
                                icon={card.icon}
                                color={card.color}
                                onClick={() => handleCardClick(card.id)}
                            />
                        ))}
                    </div>
                </div> </>
            }
        </>

    );
};

export default ProjectOverview;