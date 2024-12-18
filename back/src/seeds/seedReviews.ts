import { closeConnection, getConnection } from "../config/dbManagerConnection.ts";
import { Reviews } from './seedData.ts';
import { ReviewsInterface } from '../interfaces/interfaces.ts';

const generateReviewsQuery = (reviews: ReviewsInterface[] ) => {
  const values = reviews
    .map(
      (review) =>
        `('${review.rating}', '${review.comment}', '${review.driver_id}')`
    )
    .join(',\n');

  const query = `
    INSERT INTO reviews (rating, comment, driver_id)
    VALUES ${values};
  `;
  
  return query;
};

const reviewsInsertQuery = generateReviewsQuery(Reviews);

const seedDatabase = async () => {
  const connection = await getConnection();

  try {
    await connection.query('TRUNCATE TABLE reviews');
    console.log("Truncate na tabela Reviews.");
    

    await connection.query(reviewsInsertQuery);

    console.log('Reviews carregados com sucesso!');
  } catch (error) {
    console.error('Erro durante o seeding:', error);
  } finally {
    await closeConnection();
  }
};

seedDatabase();
