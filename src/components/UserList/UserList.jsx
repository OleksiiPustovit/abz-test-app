import React, {useState, useEffect} from "react";
import "./UserList.scss";
import { Loader } from "../Loader";
import { UserCard } from "../UserCard";

import { getUsers } from "../../services/API";

export const UserList = () => {
  const [users, setUsers] =useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    

    getUsers(page)
      .then(data => {

        setShowMore(data.page < data.total_pages);
        if (page === 1) {
          setUsers(data.users);
          return;
        }


        setUsers(prevState => [...prevState, ...data.users]);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      })
      .finally(setIsLoading(false));

  }, [page]);

  const onShowMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
        <div className="list">
          {users
          .map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
        {showMore && (
          <button className="button" onClick={onShowMore}>Show more</button>
        )}
        </>
      )}
    </>
  );
};