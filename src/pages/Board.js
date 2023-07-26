import React from 'react';
import { Link } from 'react-router-dom';

const Board = () => {
    return (
        <div className='Board'>
            <ul>
                <li>
                    Session
                    <ul>
                        <li>
                             <Link to="Public/Session/index">Liste</Link>
                        </li>
                        <li>
                            <Link to="Public/Session/Edit">Edit</Link>
                        </li>
                    </ul>
                </li>
                <li>
                Learner
                    <ul>
                        <li>
                            <Link to="Public/Learner/index">Liste</Link>
                        </li>
                        <li>
                            <Link to="Public/Learner/add">Ajouter</Link>
                        </li>
                        <li>
                            <Link to="Public/Learner/Edit">Editer</Link>
                        </li>
                    </ul>
                </li>
            </ul>
            
        </div>
    );
};

export default Board;