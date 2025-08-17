export default function Hero() {
  return (
    <section className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-[0.8fr_auto_1.2fr] items-center gap-6 md:gap-">
        {/* Vertical divider */}
        <div className="hidden md:block w-px h-full bg-border" aria-hidden />
        <div className="block md:hidden h-px bg-border my-6" aria-hidden />

        {/* Quote */}
        <blockquote className="md:pl-6">
          <p className="text-base md:text-lg leading-relaxed italic max-w-xl">
            “I consider that a man's brain originally is like a little empty attic, 
            and you have to stock it with such furniture as you choose. 
            A fool takes in all the lumber of every sort that he comes across, 
            so that the knowledge which might be useful to him gets crowded out, 
            or at best is jumbled up with a lot of other things, so that he has a 
            difficulty in laying his hands upon it. Now the skillful workman is very 
            careful indeed as to what he takes into his brain-attic. He will have nothing 
            but the tools which may help him in doing his work, but of these he has a large 
            assortment, and all in the most perfect order. It is a mistake to think that 
            that little room has elastic walls and can distend to any extent. Depend upon it 
            there comes a time when for every addition of knowledge you forget something that 
            you knew before. It is of the highest importance, therefore, not to have useless 
            facts elbowing out the useful ones.”
          </p>
          <footer className="mt-3 text-xs md:text-sm text-muted-foreground">
            — Sherlock Holmes, <cite className="not-italic">A Study in Scarlet</cite> by Sir Arthur Conan Doyle
          </footer>
        </blockquote>
      </div>
    </section>
  );
}