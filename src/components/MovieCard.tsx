'use client';

import { Card, Tag, Typography } from 'antd';
import { format } from 'date-fns';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

interface MovieCardProps {
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  genres: string[];
}

export default function MovieCard({
  title,
  overview,
  releaseDate,
  posterPath,
  genres,
}: MovieCardProps) {
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
        <Title level={5}>{title}</Title>
        <p className="card-date">{formattedDate}</p>
        <div className="card-genre">
          {genres.map((genre, idx) => (
            <Tag key={idx}>{genre}</Tag>
          ))}
        </div>
        <Paragraph
          className="card-description"
          ellipsis={{ rows: 6, expandable: false }}
        >
          {overview}
        </Paragraph>
      </div>
    </Card>
  );
}
