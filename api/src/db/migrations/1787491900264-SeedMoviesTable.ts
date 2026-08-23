import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMoviesTable1787491600000 implements MigrationInterface {
  name = 'SeedMoviesTable1787491600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO movies (id, title, release_year, runtime_minutes, overview, poster_url, trailer_url, language) VALUES
        (1, 'Arrival', 2016, 116, 'A linguist is recruited to work out what twelve alien craft want before the world decides for her.', 'https://picsum.photos/seed/mmdb-movie-1/400/600', 'https://videos.mmdb.example/trailers/1.mp4', 'English'),
        (2, 'Whiplash', 2014, 106, 'A young drummer and a teacher who believes cruelty is the only route to greatness.', 'https://picsum.photos/seed/mmdb-movie-2/400/600', 'https://videos.mmdb.example/trailers/2.mp4', 'English'),
        (3, 'Parasite', 2019, 132, 'One family talks its way into another''s house, and neither can leave as they were.', 'https://picsum.photos/seed/mmdb-movie-3/400/600', 'https://videos.mmdb.example/trailers/3.mp4', 'Korean'),
        (4, 'Mad Max: Fury Road', 2015, 120, 'A two hour chase in the wrong direction, then the same chase back.', 'https://picsum.photos/seed/mmdb-movie-4/400/600', 'https://videos.mmdb.example/trailers/4.mp4', 'English'),
        (5, 'Get Out', 2017, 104, 'A weekend with his girlfriend''s parents goes wrong slowly, then all at once.', 'https://picsum.photos/seed/mmdb-movie-5/400/600', 'https://videos.mmdb.example/trailers/5.mp4', 'English'),
        (6, 'Blade Runner 2049', 2017, 164, 'A replicant detective finds a buried secret that could undo the order he serves.', 'https://picsum.photos/seed/mmdb-movie-6/400/600', 'https://videos.mmdb.example/trailers/6.mp4', 'English'),
        (7, 'The Grand Budapest Hotel', 2014, 99, 'A concierge, a lobby boy, a stolen painting and a continent falling apart around them.', 'https://picsum.photos/seed/mmdb-movie-7/400/600', NULL, 'English'),
        (8, 'Spirited Away', 2001, 125, 'A girl takes work in a bathhouse for spirits to win back her parents.', 'https://picsum.photos/seed/mmdb-movie-8/400/600', 'https://videos.mmdb.example/trailers/8.mp4', 'Japanese'),
        (9, 'Portrait of a Lady on Fire', 2019, 122, 'A painter is hired to study a woman without her knowing why she is being watched.', 'https://picsum.photos/seed/mmdb-movie-9/400/600', 'https://videos.mmdb.example/trailers/9.mp4', 'French'),
        (10, 'Everything Everywhere All at Once', 2022, 139, 'A laundromat owner is asked to save every version of herself at once.', 'https://picsum.photos/seed/mmdb-movie-10/400/600', 'https://videos.mmdb.example/trailers/10.mp4', 'English'),
        (11, 'Dune', 2021, 155, 'A family is handed a desert planet and the trap that comes with it.', 'https://picsum.photos/seed/mmdb-movie-11/400/600', 'https://videos.mmdb.example/trailers/11.mp4', 'English'),
        (12, 'Oppenheimer', 2023, 180, 'The man who built the bomb, and the years he spent answering for it.', 'https://picsum.photos/seed/mmdb-movie-12/400/600', 'https://videos.mmdb.example/trailers/12.mp4', 'English'),
        (13, 'Barbie', 2023, 114, 'Barbie leaves a perfect world for a real one and finds neither works as advertised.', 'https://picsum.photos/seed/mmdb-movie-13/400/600', 'https://videos.mmdb.example/trailers/13.mp4', 'English'),
        (14, 'Past Lives', 2023, 105, 'Two childhood friends meet again twice, decades apart, and measure what was lost.', 'https://picsum.photos/seed/mmdb-movie-14/400/600', NULL, 'English'),
        (15, 'The Social Network', 2010, 120, 'A website is built in a dorm room and a friendship is spent paying for it.', 'https://picsum.photos/seed/mmdb-movie-15/400/600', 'https://videos.mmdb.example/trailers/15.mp4', 'English'),
        (16, 'Moonlight', 2016, 111, 'Three chapters in one man''s life, each one a different name.', 'https://picsum.photos/seed/mmdb-movie-16/400/600', 'https://videos.mmdb.example/trailers/16.mp4', 'English'),
        (17, 'Roma', 2018, 135, 'A year in a household in Mexico City, seen from the person nobody asks.', 'https://picsum.photos/seed/mmdb-movie-17/400/600', 'https://videos.mmdb.example/trailers/17.mp4', 'Spanish'),
        (18, 'Knives Out', 2019, 130, 'A novelist dies rich and every heir has a reason to be relieved.', 'https://picsum.photos/seed/mmdb-movie-18/400/600', 'https://videos.mmdb.example/trailers/18.mp4', 'English'),
        (19, 'Sicario', 2015, 121, NULL, 'https://picsum.photos/seed/mmdb-movie-19/400/600', 'https://videos.mmdb.example/trailers/19.mp4', 'English'),
        (20, 'Her', 2013, 126, 'A lonely writer falls for an operating system, which turns out to be the easy part.', 'https://picsum.photos/seed/mmdb-movie-20/400/600', 'https://videos.mmdb.example/trailers/20.mp4', 'English'),
        (21, 'The Handmaiden', 2016, 145, 'A maid is planted in a heiress''s house, and the plan holds for about an hour.', 'https://picsum.photos/seed/mmdb-movie-21/400/600', NULL, 'Korean'),
        (22, 'Coco', 2017, 105, 'A boy who wants to play music ends up in a country where his family can hear him.', 'https://picsum.photos/seed/mmdb-movie-22/400/600', 'https://videos.mmdb.example/trailers/22.mp4', 'English'),
        (23, 'Inside Out', 2015, 95, 'Five emotions run a girl''s mind and disagree about what she should feel.', 'https://picsum.photos/seed/mmdb-movie-23/400/600', 'https://videos.mmdb.example/trailers/23.mp4', 'English'),
        (24, 'Nomadland', 2020, 107, 'A woman drives west after her town closes and does not go back.', 'https://picsum.photos/seed/mmdb-movie-24/400/600', 'https://videos.mmdb.example/trailers/24.mp4', 'English'),
        (25, 'The Lighthouse', 2019, 109, 'Two men, one rock, four weeks of weather and no way to leave.', 'https://picsum.photos/seed/mmdb-movie-25/400/600', 'https://videos.mmdb.example/trailers/25.mp4', 'English'),
        (26, 'Prisoners', 2013, 153, 'Two girls vanish and a father decides waiting is not an option.', 'https://picsum.photos/seed/mmdb-movie-26/400/600', 'https://videos.mmdb.example/trailers/26.mp4', 'English'),
        (27, 'Ex Machina', 2014, 108, 'A programmer is invited to test whether a machine is a person.', 'https://picsum.photos/seed/mmdb-movie-27/400/600', 'https://videos.mmdb.example/trailers/27.mp4', 'English'),
        (28, 'Uncut Gems', 2019, 135, 'A jeweller makes one more bet, then one more, for two straight hours.', 'https://picsum.photos/seed/mmdb-movie-28/400/600', NULL, 'English'),
        (29, 'Lady Bird', 2017, NULL, 'A last year of school, a mother, and a city neither will admit they love.', 'https://picsum.photos/seed/mmdb-movie-29/400/600', 'https://videos.mmdb.example/trailers/29.mp4', 'English'),
        (30, 'The Favourite', 2018, 119, 'Two cousins compete for a queen''s attention and neither is playing fairly.', 'https://picsum.photos/seed/mmdb-movie-30/400/600', 'https://videos.mmdb.example/trailers/30.mp4', 'English'),
        (31, 'Anatomy of a Fall', 2023, 151, 'A man falls from a window and his wife''s marriage is put on trial instead.', 'https://picsum.photos/seed/mmdb-movie-31/400/600', 'https://videos.mmdb.example/trailers/31.mp4', 'French'),
        (32, 'The Zone of Interest', 2023, 105, 'A family keeps a beautiful garden next to a wall they never mention.', 'https://picsum.photos/seed/mmdb-movie-32/400/600', 'https://videos.mmdb.example/trailers/32.mp4', 'German'),
        (33, 'Poor Things', 2023, 141, 'A woman is brought back to life and refuses every instruction that follows.', 'https://picsum.photos/seed/mmdb-movie-33/400/600', 'https://videos.mmdb.example/trailers/33.mp4', 'English'),
        (34, 'Killers of the Flower Moon', 2023, 206, 'The Osage grow rich on oil, and then begin to die.', 'https://picsum.photos/seed/mmdb-movie-34/400/600', 'https://videos.mmdb.example/trailers/34.mp4', 'English'),
        (35, 'Aftersun', 2022, 102, 'A holiday remembered by a daughter who now understands what she was watching.', 'https://picsum.photos/seed/mmdb-movie-35/400/600', NULL, 'English'),
        (36, 'The Banshees of Inisherin', 2022, 114, 'A man stops speaking to his friend and will not say why.', 'https://picsum.photos/seed/mmdb-movie-36/400/600', 'https://videos.mmdb.example/trailers/36.mp4', 'English'),
        (37, 'Top Gun: Maverick', 2022, 130, 'A pilot who should have retired is asked to teach the people replacing him.', 'https://picsum.photos/seed/mmdb-movie-37/400/600', 'https://videos.mmdb.example/trailers/37.mp4', 'English'),
        (38, 'Nope', 2022, 130, NULL, 'https://picsum.photos/seed/mmdb-movie-38/400/600', 'https://videos.mmdb.example/trailers/38.mp4', 'English'),
        (39, 'Tar', 2022, 158, 'A conductor at the top of her field discovers what her reputation is standing on.', 'https://picsum.photos/seed/mmdb-movie-39/400/600', 'https://videos.mmdb.example/trailers/39.mp4', 'English'),
        (40, 'Dunkirk', 2017, 106, 'One beach, three timelines, and four hundred thousand men waiting.', 'https://picsum.photos/seed/mmdb-movie-40/400/600', 'https://videos.mmdb.example/trailers/40.mp4', 'English'),
        (41, 'Interstellar', 2014, 169, 'A farmer leaves a dying Earth to find another, and loses the years instead.', 'https://picsum.photos/seed/mmdb-movie-41/400/600', 'https://videos.mmdb.example/trailers/41.mp4', 'English'),
        (42, 'Gone Girl', 2014, 149, 'A wife disappears and her husband is very bad at looking innocent.', 'https://picsum.photos/seed/mmdb-movie-42/400/600', NULL, 'English'),
        (43, 'Birdman', 2014, 119, 'A former superhero actor stakes everything on a Broadway play.', 'https://picsum.photos/seed/mmdb-movie-43/400/600', 'https://videos.mmdb.example/trailers/43.mp4', 'English'),
        (44, 'Spotlight', 2015, 129, 'Four reporters spend a year proving what a city already half knew.', 'https://picsum.photos/seed/mmdb-movie-44/400/600', 'https://videos.mmdb.example/trailers/44.mp4', 'English'),
        (45, 'Room', 2015, 118, 'A mother makes a world out of one room, then has to unmake it.', 'https://picsum.photos/seed/mmdb-movie-45/400/600', 'https://videos.mmdb.example/trailers/45.mp4', 'English'),
        (46, 'Arrival of a Train', 1896, 1, 'A train arrives at a station. The audience is reported to have moved.', 'https://picsum.photos/seed/mmdb-movie-46/400/600', 'https://videos.mmdb.example/trailers/46.mp4', 'French'),
        (47, 'Hereditary', 2018, 127, 'A family inherits more than a house when the grandmother dies.', 'https://picsum.photos/seed/mmdb-movie-47/400/600', 'https://videos.mmdb.example/trailers/47.mp4', 'English'),
        (48, 'A Separation', 2011, 123, 'A couple separates and every honest person involved makes it worse.', 'https://picsum.photos/seed/mmdb-movie-48/400/600', 'https://videos.mmdb.example/trailers/48.mp4', 'Persian'),
        (49, 'Drive', 2011, 100, 'A stunt driver takes a job at night and it goes wrong immediately.', 'https://picsum.photos/seed/mmdb-movie-49/400/600', NULL, 'English'),
        (50, 'The Master', 2012, 138, 'A drifter attaches himself to a man building a religion.', 'https://picsum.photos/seed/mmdb-movie-50/400/600', 'https://videos.mmdb.example/trailers/50.mp4', 'English'),
        (51, 'Burning', 2018, 148, 'A young man is told about a hobby and cannot stop thinking about it.', 'https://picsum.photos/seed/mmdb-movie-51/400/600', 'https://videos.mmdb.example/trailers/51.mp4', 'Korean'),
        (52, 'Shoplifters', 2018, 121, 'A family that is not one takes in a child who was not theirs.', 'https://picsum.photos/seed/mmdb-movie-52/400/600', 'https://videos.mmdb.example/trailers/52.mp4', 'Japanese'),
        (53, 'Call Me by Your Name', 2017, 132, 'One summer in Italy, and the conversation that ends it.', 'https://picsum.photos/seed/mmdb-movie-53/400/600', 'https://videos.mmdb.example/trailers/53.mp4', 'English'),
        (54, 'First Reformed', 2017, 113, 'A pastor is asked a question about the future and cannot put it down.', 'https://picsum.photos/seed/mmdb-movie-54/400/600', 'https://videos.mmdb.example/trailers/54.mp4', 'English'),
        (55, 'Under the Skin', 2013, 108, 'Something wearing a woman drives around Glasgow collecting men.', 'https://picsum.photos/seed/mmdb-movie-55/400/600', 'https://videos.mmdb.example/trailers/55.mp4', 'English'),
        (56, 'The Witch', 2015, 92, 'A family is exiled to the edge of a wood that is not empty.', 'https://picsum.photos/seed/mmdb-movie-56/400/600', NULL, 'English'),
        (57, 'Minari', 2020, 115, NULL, 'https://picsum.photos/seed/mmdb-movie-57/400/600', 'https://videos.mmdb.example/trailers/57.mp4', 'English'),
        (58, 'Sound of Metal', 2019, NULL, 'A drummer loses his hearing and is offered a life he did not choose.', 'https://picsum.photos/seed/mmdb-movie-58/400/600', 'https://videos.mmdb.example/trailers/58.mp4', 'English'),
        (59, 'The Florida Project', 2017, 111, 'A summer in a motel outside a theme park, from six years old.', 'https://picsum.photos/seed/mmdb-movie-59/400/600', 'https://videos.mmdb.example/trailers/59.mp4', 'English'),
        (60, 'Léon: The Professional', 1994, 110, 'A hitman takes in the girl from down the hall after her family is killed.', 'https://picsum.photos/seed/mmdb-movie-60/400/600', 'https://videos.mmdb.example/trailers/60.mp4', 'English'),
        (61, 'Amélie', 2001, 122, 'A waitress decides to fix other people''s lives instead of her own.', 'https://picsum.photos/seed/mmdb-movie-61/400/600', 'https://videos.mmdb.example/trailers/61.mp4', 'French'),
        (62, 'Oldboy', 2003, 120, 'A man is imprisoned for fifteen years without being told why, then released.', 'https://picsum.photos/seed/mmdb-movie-62/400/600', 'https://videos.mmdb.example/trailers/62.mp4', 'Korean'),
        (63, 'City of God', 2002, 130, 'Two boys grow up in the same favela and choose differently.', 'https://picsum.photos/seed/mmdb-movie-63/400/600', NULL, 'Portuguese'),
        (64, 'Pan''s Labyrinth', 2006, 118, 'A girl finds a labyrinth in fascist Spain and is given three tasks.', 'https://picsum.photos/seed/mmdb-movie-64/400/600', 'https://videos.mmdb.example/trailers/64.mp4', 'Spanish');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM movies WHERE id BETWEEN 1 AND 64;`);
  }
}
