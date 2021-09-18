import React, { useEffect, useState } from "react"
import compareValues from "../../utils/compareValues";
import Article from "./Article"
import Filters from "./Filters"

import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import { deletePostAction } from "../../store/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export default function PostList({ posts }) {
    const [modalParams, setModalParams] = React.useState({show: false, id: null, token: null});
    const [filters, setFilters] = useState({
        filter: 'date',
        ordering: 'desc'
    });
    const dispatch = useDispatch();
    const history = useRouter();

    const handleDeletePermanently = async (event) => {
        event.preventDefault();
        await dispatch(deletePostAction(modalParams.id, modalParams.token, history));
        setModalParams({show:false, id: null, token: null})
    }

    useEffect(() => {
        posts.sort(compareValues(filters.filter, filters.ordering));
        console.log(posts)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [filters]);

    return (
        <div className="max-w-5xl mx-auto">
            <Filters filters={filters} setFilters={setFilters} />
            <div className="grid grid-cols-1 md:grid-cols-2 space-x-5 space-y-5">
                {posts.map((item) => (
                    <Article
                        image={item.image}
                        body={item.body}
                        title={item.title}
                        user={item.user}
                        id={item.pk}
                        key={item.pk}
                        date={item.date}
                        setModalParams={setModalParams}
                    />
                ))}
                
            </div>
            <Modal size="sm" active={modalParams.show} toggler={() => setModalParams(prevState => ({...prevState, show: false}))}>
                <ModalHeader toggler={() => setModalParams(prevState => ({...prevState, show: false}))}>
                    Delete post
                </ModalHeader>
                <ModalBody>
                    <p className="text-base leading-relaxed text-gray-600 font-normal">
                        Are you sure you want to delete this post?
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="green"
                        buttonType="link"
                        onClick={(e) => setModalParams(prevState => ({...prevState, show: false}))}
                        ripple="dark"
                    >
                        Close
                    </Button>

                    <Button
                        color="red"
                        onClick={handleDeletePermanently}
                        ripple="light"
                    >
                        Delete permanently
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}