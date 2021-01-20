import {useState,useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import {Scrollbars} from 'react-custom-scrollbars'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import SearchIcon from '@material-ui/icons/Search';
import '../css/search.css'
function Search()
{
  const [data,setdata]=useState([])
  const [key,setkey]=useState('')
  useEffect(()=>
  {
    axios.get(`https://api.github.com/search/repositories?q=%22${key}%22`)
      .then(res=>
      {
        console.log(res.data)
        if(res.data.items.length>0) {
          setdata(res.data.items)
        }
        else {

        }
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
          data.length>0 && data.map(item=>
            <div className="search_each_card">
              {/*<Scrollbars>*/}
                <div className="search_name_cont">
                  <a href={item?.html_url} target={"_blank"} rel="noreferrer">{item?.full_name}</a>
                  <span><StarBorderIcon/>{item?.stargazers_count}</span>
                </div>
                <div className="item_desc_cont">
                  <p>{item?.description}</p>
                </div>
                <a href={item?.owner?.url} target={"_blank"}  rel="noreferrer">
                  <div className="item_owner_cont">
                    <img src={item?.owner?.avatar_url} alt=""/>
                    <p>{item?.owner?.login}</p>
                  </div>
                </a>
                <p className={"item_updated"}>Updated at {moment(new Date(item?.updated_at)).format('HH:MM, DD MMMM  YYYY')}  </p>
              {/*</Scrollbars>*/}
            </div>
            )
        }
      </div>
    </div>
  )
}

export default Search;