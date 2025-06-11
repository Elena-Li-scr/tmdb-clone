'use client';

import { Card, Tag, Typography, Rate } from 'antd';
import { format } from 'date-fns';
import Image from 'next/image';
import { Movie } from '@/types';

const { Title, Paragraph } = Typography;

interface MovieCardProps {
  movie: Movie;
  genres: string[];
  userRating?: number;
  onRate?: (value: number) => void;
}
function getRatingColor(rating: number): string {
  if (rating <= 3) return '#E90000';
  if (rating <= 5) return '#E97E00';
  if (rating <= 7) return '#E9D100';
  return '#66E900';
}

export default function MovieCard({
  movie,
  genres,
  userRating,
  onRate,
}: MovieCardProps) {
  const releaseDate = movie.release_date;
  const title = movie.title;
  const overview = movie.overview;
  const posterPath = movie.poster_path;
  const formattedDate =
    releaseDate && !isNaN(new Date(releaseDate).getTime())
      ? format(new Date(releaseDate), 'PPP')
      : 'Unknown';

  return (
    <Card className="custom-card">
      <div className="card-poster">
        <Image
          src={
            posterPath
              ? `https://image.tmdb.org/t/p/w500${posterPath}`
              : '/poster.jpg'
          }
          alt={title}
          width={183}
          height={281}
        />
      </div>
      <div className="card-info">
        <div className="card-title">
          <Title level={5}>{title}</Title>
        </div>
        {userRating !== undefined && (
          <div
            className="rating-circle"
            style={{
              border: `1px solid ${getRatingColor(userRating)}`,
            }}
          >
            {userRating.toFixed(1)}
          </div>
        )}
        <p className="card-date">{formattedDate}</p>
        <div className="card-genre">
          {genres.map((genre, idx) => (
            <Tag key={idx}>{genre}</Tag>
          ))}
        </div>
        <Paragraph
          className="card-description"
          ellipsis={{ rows: 4, expandable: false }}
        >
          {overview}
        </Paragraph>
        <div className="user-rating">
          {userRating !== undefined ? (
            <Rate allowHalf disabled value={userRating / 2} />
          ) : onRate ? (
            <Rate allowHalf value={0} onChange={onRate} />
          ) : null}
        </div>
      </div>
    </Card>
  );
}
