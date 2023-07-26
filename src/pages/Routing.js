import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home, Board, Error, Layout } from '@/pages'
import { Learner, LearnerAdd, LearnerEdit } from '@/pages/Public/Learner'
import { Session, SessionEdit } from '@/pages/Public/Session'

const Routing = () => {
    return (
        <div>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />}/>

                    <Route path="/home" element={<Home />}/>
                    <Route path="/board" element={<Board />}/>
                    <Route path="session">
                        <Route path="index" element={<Session />}/>
                        <Route path="edit" element={<SessionEdit />}/>
                    </Route>
                    <Route path="learner">
                        <Route path="index" element={<Learner />}/>
                        <Route path="add" element={<LearnerAdd />}/>
                        <Route path="edit" element={<LearnerEdit />}/>
                    </Route>

                    <Route path="*" element={<Error />}/>
                </Route>
            </Routes>
        </div>
    );
};

export default Routing;