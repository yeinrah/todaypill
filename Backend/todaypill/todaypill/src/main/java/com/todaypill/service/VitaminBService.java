package com.todaypill.service;

import java.io.IOException;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todaypill.db.entity.Supplement;
import com.todaypill.db.entity.VitaminB;
import com.todaypill.repository.SupplementRepository;
import com.todaypill.repository.VitaminBRepository;

@Service
public class VitaminBService {
	@Autowired
	private SupplementRepository supplementRepository;

	@Autowired
	private VitaminBRepository vitaminBRepository;

	public VitaminBService(SupplementRepository supplementRepository, VitaminBRepository vitaminBRepository) {
		super();
		this.supplementRepository = supplementRepository;
		this.vitaminBRepository = vitaminBRepository;
	}

	public void addVitaminB() throws IOException, InterruptedException {
		// String category, String supplementName, Double price, String brand,
		// String image, String ingredients, Integer bioavailability, Integer laxative,
		// Integer kidneyDisease, Integer consumerLabScore, String additionalEfficacy,
		// String note, Float amount, Float requiredCount, String formula, Integer like,
		// Boolean sustainedRelease, String pillSize, String bestTime

		List<VitaminB> list = vitaminBRepository.findAll();
		for (VitaminB m : list) {
			String category = m.getCategory();
			String brand = m.getName().split(",")[0];
			String supplementName = m.getName().substring(brand.length() + 2);
			String[] ps = m.getPrice().split(",");
			Double price = Double.parseDouble(ps[0].concat(ps[1]));
			String image = m.getImg();
			String ingredients = m.getNutrition();

			// 여기서부터 점수 계산
			int cnt = 0;
			Double bioavailability = (double) 0;
			Double laxative = (double) 0;
			Double kidneyDisease = (double) 0;
			StringBuilder sb = new StringBuilder();
			Set<String> set = new LinkedHashSet<String>();

			if (ingredients.contains("티아민HCI") || ingredients.contains("티아민 염산염")
					|| ingredients.contains("thiamine HCI")) {
				cnt++;
				bioavailability += -5;
				set.add("muscle_pain");
			}
			if (ingredients.contains("티아민 나이트레이트") || ingredients.contains("티아민 질산염")
					|| ingredients.contains("thiamine nitrate")) {
				cnt++;
				bioavailability += -5;
				set.add("vitality");
			}
			if (ingredients.contains("티아민 피로인산") || ingredients.contains("TPP")
					|| ingredients.contains("thiamine pyrophosphate")) {
				cnt++;
				bioavailability += 5;
				set.add("energy_production");
			}
			if (ingredients.contains("벤포티아민") || ingredients.contains("benfotiamine")) {
				cnt++;
				bioavailability += 5;
				set.add("immune");
			}
			if (ingredients.contains("푸르설티아민") || ingredients.contains("fursultiamine")) {
				cnt++;
				bioavailability += 5;
				set.add("neuralgia");
			}
			if (ingredients.contains("비스벤티아민") || ingredients.contains("bisbentiamine")) {
				cnt++;
				bioavailability += 5;
				set.add("joint_pain");
			}
			if (ingredients.contains("리보플라빈") || ingredients.contains("riboflavin") || ingredients.contains("글루코네이트")) {
				cnt++;
				set.add("migraine");
			}
			if (ingredients.contains("리보플라빈포스페이트") || ingredients.contains("riboflavine-5-phosphate")) {
				cnt++;
				bioavailability += 1;
				set.add("Hair_loss");
			}
			if (ingredients.contains("판토텐산") || ingredients.contains("pantothenic acid")
					|| ingredients.contains("설페이트")) {
				cnt++;
				set.add("lessening_of_tension");
			}
			if (ingredients.contains("판테틴") || ingredients.contains("pantethine")) {
				cnt++;
				bioavailability += 1;
				set.add("Stress_control");
			}
			if (ingredients.contains("피리독신 염산염") || ingredients.contains("pyridoxine HCI")) {
				cnt++;
				set.add("amino_acid_metabolism");
			}
			if (ingredients.contains("피리독설포스페이트") || ingredients.contains("pyridoxal-5-phosphate")) {
				cnt++;
				bioavailability += 1;
				set.add("homocysteine_control");
			}
			if (ingredients.contains("엽산") || ingredients.contains("folic acid")) {
				cnt++;
				set.add("heart_disease");
			}
			if (ingredients.contains("메틸테트라히드로폴레이트") || ingredients.contains("5-methyltetrahydrofolate")
					|| ingredients.contains("5-MTHF")) {
				cnt++;
				bioavailability += 1;
				set.add("Depression");
			}
			if (ingredients.contains("시아노코발라민") || ingredients.contains("cyanocobalamin")) {
				cnt++;
				set.add("blood");
			}
			if (ingredients.contains("히드록소코발라민") || ingredients.contains("hydroxocobalamin")) {
				cnt++;
				bioavailability += 1;
				set.add("Cancer");
			}
			if (ingredients.contains("메틸코발라민") || ingredients.contains("methylcobalamin")) {
				cnt++;
				bioavailability += 1;
				set.add("appetite_boost");
			}
			if (ingredients.contains("아데노실코발라민") || ingredients.contains("adenocylcobalamin")) {
				cnt++;
				bioavailability += 1;
				set.add("brain_cells");
			}

			if (cnt != 0) {
				bioavailability = (double) Math.round(bioavailability / cnt * 10) / 10.0;
				laxative = (double) Math.round(laxative / cnt * 10) / 10.0;
				kidneyDisease = (double) Math.round(kidneyDisease / cnt * 10) / 10.0;
			}

			Integer consumerLabScore = 0;

			for (String s : set) {
				sb.append(s);
				sb.append(", ");
			}

			String additionalEfficacy = sb.toString();
			if (sb.length() > 0)
				additionalEfficacy = sb.toString().substring(0, sb.length() - 2);
			String note = "점심 식후 30분";
			String[] detail = m.getName().split(", ");
			String amount = detail[detail.length - 1];
			String requiredCount = m.getServing();
			String formula = "capsule";
			if (amount.contains("ml") || requiredCount.contains("ml"))
				formula = "liquid";
			if (amount.contains("젤리"))
				formula = "chewable";
			if (amount.contains("g") || requiredCount.contains("g"))
				formula = "powder";
			Integer like = 0;
			Boolean sustainedRelease = false;
			if (m.getName().contains("서방형") || m.getName().contains("리포솜") || m.getName().contains("리포소말")
					|| m.getName().contains("sustained") || m.getName().contains("timed"))
				sustainedRelease = true;
			String pillSize = "";
			String bestTime = "13:00";
			Supplement supplement = Supplement.builder().category(category).supplementName(supplementName).price(price)
					.brand(brand).image(image).ingredients(ingredients).bioavailability(bioavailability)
					.laxative(laxative).kidneyDisease(kidneyDisease).consumerLabScore(consumerLabScore)
					.additionalEfficacy(additionalEfficacy).note(note).amount(amount).requiredCount(requiredCount)
					.formula(formula).like(like).sustainedRelease(sustainedRelease).pillSize(pillSize)
					.bestTime(bestTime).build();
			supplementRepository.save(supplement);
		}
	}
}
