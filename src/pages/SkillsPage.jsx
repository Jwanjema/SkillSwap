import { useState, useEffect } from 'react'
import axios from 'axios'
import SkillList from '../components/SkillList'
import SearchBar from '../components/SearchBar'
import './SkillsPage.css'

export default function SkillsPage() {
  const [skills, setSkills] = useState([])
  const [filteredSkills, setFilteredSkills] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All')
  const [nearMe, setNearMe] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3000/skills')
      .then(res => {
        setSkills(res.data)
        setFilteredSkills(res.data)
      })
  }, [])

  useEffect(() => {
    let results = [...skills]
    
    if (searchTerm) {
      results = results.filter(skill => 
        skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (category !== 'All') {
      results = results.filter(skill => skill.category === category)
    }
    
    if (nearMe) {
      results = results.filter(skill => skill.neighborhood === 'Downtown') // Mock location
    }
    
    setFilteredSkills(results)
  }, [searchTerm, category, nearMe, skills])

  return (
    <div className="skills-page">
      <SearchBar 
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      selectedCategory={category}        
      setSelectedCategory={setCategory}  
      nearMe={nearMe}
      setNearMe={setNearMe}
      />

      <SkillList skills={filteredSkills} />
    </div>
  )
}