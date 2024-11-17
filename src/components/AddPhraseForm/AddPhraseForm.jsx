import { useState } from 'react'
import { addPhrase } from '../../shared/api';
import "./addphraseform.css"

const AddPhraseForm = () => {
    const [formData, setFormData] = useState({
        number: 0,
        quote: '',
        movie: '',
        year: '',
        director: '',
        original: '',
        actor: '',
        character: '',
        context: '',
        poster: '',
        used: false,
      });
    
      const [errors, setErrors] = useState({});
      const [submittedPhrase, setSubmittedPhrase] = useState(null);
      const [letterCount, setLetterCount] = useState(0);
      const validate = () => {
        const errors = {};
    
        
        if (!formData.quote) errors.quote = 'Quote is required';
        if (!formData.movie) errors.movie = 'Movie is required';
        if (!formData.year) errors.year = 'Year is required';
        if (!formData.director) errors.director = 'Director is required';
        if (!formData.actor) errors.actor = 'Actor is required';
        if (!formData.character) errors.character = 'Character is required';
        if (!formData.context) errors.context = 'Context is required';
        if (!formData.poster) errors.poster = 'Poster URL is required';
    
        setErrors(errors);
        return Object.keys(errors).length === 0;
      };
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value,
        });
        if (name === "quote") {
          // Actualizar el conteo de letras cuando se cambia el campo "quote"
          const lettersOnly = value.replace(/[^a-zA-Z]/g, ''); // Elimina todo excepto letras
          setLetterCount(lettersOnly.length); // Actualiza el conteo de letras
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
    
        try {
          const { actor, character, context, ...rest } = formData;
          const response = await addPhrase({
            ...rest,
            who_said_it: {
              actor,
              
              character,
              
              context
              
            },
          });
          setSubmittedPhrase(response);
          alert('Phrase added successfully!');
          setFormData({
            number: 0,
            quote: '',
            movie: '',
            year: '',
            director: '',
            original: '',
            actor: '',
            character: '',
            context: '',
            poster: '',
            used: false,
          });
          setLetterCount(0);
        } catch (error) {
          console.error('Error adding phrase:', error);
          alert('Error adding phrase');
        }
      };
    
      return (
        <form onSubmit={handleSubmit}>
          
          <div className="form-field">
            <label>Quote:</label>
            <textarea name="quote" value={formData.quote} onChange={handleChange} required />
            {errors.quote && <span>{errors.quote}</span>}
            <p>Número de letras: {letterCount}</p>
          </div>
          <div className="form-field">
            <label>Movie:</label>
            <input type="text" name="movie" value={formData.movie} onChange={handleChange} required />
            {errors.movie && <span>{errors.movie}</span>}
          </div>
          <div className="form-field">
            <label>Year:</label>
            <input type="number" name="year" value={formData.year} onChange={handleChange} required />
            {errors.year && <span>{errors.year}</span>}
          </div>
          <div className="form-field">
            <label>Director:</label>
            <input type="text" name="director" value={formData.director} onChange={handleChange} required />
            {errors.director && <span>{errors.director}</span>}
          </div>
          <div className="form-field">
            <label>Original:</label>
            <textarea name="original" value={formData.original} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label>Actor:</label>
            <input type="text" name="actor" value={formData.actor} onChange={handleChange} required />
            {errors.actor && <span>{errors.actor}</span>}
          </div>
          <div className="form-field">
            <label>Character:</label>
            <input type="text" name="character" value={formData.character} onChange={handleChange} required />
            {errors.character && <span>{errors.character}</span>}
          </div>
          <div className="form-field">
            <label>Context:</label>
            <textarea name="context" value={formData.context} onChange={handleChange} required />
            {errors.context && <span>{errors.context}</span>}
          </div>
          <div className="form-field">
            <label>Poster URL:</label>
            <input type="text" name="poster" value={formData.poster} onChange={handleChange} required />
            {errors.poster && <span>{errors.poster}</span>}
          </div>
        
          <button type="submit">Add Phrase</button>
          {submittedPhrase && (
        <div className='added-phrase'>
          <h3>Added Phrase:</h3>
          <pre>{JSON.stringify(submittedPhrase, null, 2)}</pre>
        </div>
      )}
        </form>
      );
    };

export default AddPhraseForm
