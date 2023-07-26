import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import Board from '@/pages/Board';
import Error from '@/pages/Error';
import Layout from '@/pages/Layout';

const Routing = () => {
    return (
        <div>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />}/>

                    <Route path="/home" element={<Home />}/>
                    <Route path="/board" element={<Board />}/>

                    <Route path="*" element={<Error />}/>
                </Route>
            </Routes>
        </div>
    );
};

export default Routing;