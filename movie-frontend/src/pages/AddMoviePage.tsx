import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const movieSchema = z.object({
  title: z.string().min(2, "Назва надто коротка"),
  genre: z.string().min(3, "Вкажіть жанр"),
  year: z.number().min(1888).max(2026),
  rating: z.number().min(0).max(10),
  description: z.string().min(10, "Опис має бути довшим"),
  // Додаємо валідацію для посилання на постер
  posterUrl: z.string().url("Введіть коректне посилання (URL)").or(z.string().length(0)).optional(),
});

const AddMoviePage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(movieSchema)
  });

  const onSubmit = async (data: any) => {
    try {
      // Якщо поле порожнє, можна передати null або дефолтну картинку
      const payload = {
        ...data,
        posterUrl: data.posterUrl || 'https://via.placeholder.com/300x450?text=No+Poster'
      };
      
      await axios.post('http://localhost:3001/movies', payload);
      alert("Фільм успішно додано!");
      navigate('/'); 
    } catch (err) {
      alert("Помилка при додаванні. Перевірте, чи оновили ви DTO на бекенді");
    }
  };

  return (
    <div>
      <h2>Додати новий фільм</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input {...register("title")} placeholder="Назва" />
        {errors.title && <span style={{color: 'red'}}>{errors.title.message as string}</span>}

        <input {...register("genre")} placeholder="Жанр" />
        <input type="number" {...register("year", { valueAsNumber: true })} placeholder="Рік" />
        <input type="number" step="0.1" {...register("rating", { valueAsNumber: true })} placeholder="Рейтинг" />
        
        {/* НОВЕ ПОЛЕ ДЛЯ ПОСТЕРА */}
        <input {...register("posterUrl")} placeholder="Посилання на постер (URL)" />
        {errors.posterUrl && <span style={{color: 'red'}}>{errors.posterUrl.message as string}</span>}

        <textarea {...register("description")} placeholder="Опис" />

        <button type="submit">Зберегти</button>
      </form>
    </div>
  );
};

export default AddMoviePage;