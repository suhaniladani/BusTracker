/*
Referred from Lecture Notes
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardBody, Button } from 'reactstrap';
import api from '../api';

export default function Search(params) {

  function deleteSearch(ev,searchId){
    var p = confirm("Are you sure? If yes, press OK");
    if(p){
      api.delete_search(searchId);
    }
  }
  let search = params.search;

console.log("adlakdjb;as;lmlkjn");
console.log(search);


  let show_delete_button;
  if(localStorage.getItem("login_id") == search.user.id)
  {
    //show_edit_link = <Link to={"/tasks/" + task.id}>Edit</Link>;
    let searchQuery = JSON.parse(search.query);
    console.log(searchQuery);
      return(<Card>
        <CardBody>
            <div>
              <p><i>Source</i>: { searchQuery.sourceName}</p>
              <p><i>Destination</i>: { searchQuery.destinationName }</p>

            </div>

            <Button onClick={(e) => deleteSearch(e, search.id)}>Delete</Button>
          </CardBody>
        </Card>);
  }
  return null;
}
