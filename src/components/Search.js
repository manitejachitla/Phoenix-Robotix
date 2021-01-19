import {useState,useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import SearchIcon from '@material-ui/icons/Search';
import '../css/search.css'
function Search()
{
  const [data,setdata]=useState([])
  const [key,setkey]=useState('react')
  useEffect(()=>
  {
    axios.get(`https://api.github.com/search/repositories?q=%22${key}%22`)
      .then(res=>
      {
        console.log(res.data)
        setdata(res.data.items)
      })
  },[key])
  return(
    <div className={"search_main_cont"}>
      <h2>Search Github</h2>
      <div className="search_input_cont">
        <input type="text" value={key} onChange={e=>setkey(e.target.value)}/>
        <div className="search_btn_cont">
          <SearchIcon/>
        </div>
      </div>
      <div className="search_cards_cont">
        {
          data.map(item=>
            <div className="search_each_card">
              <a href={item?.html_url} target={"_blank"}>{item?.full_name}</a>
              <p>{item?.description}</p>
              <p>{item?.stargazers_count}</p>
              <img src={item?.owner?.avatar_url} alt=""/>
              <p>{item?.owner?.login}</p>
              <p>Updated at {moment(new Date(item?.updated_at)).format('HH:MM, DD MMMM  YYYY')}  </p>
            </div>
            )
        }
      </div>
    </div>
  )
}

export default Search;