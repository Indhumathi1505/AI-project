package com.placement.ai.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.Map;
import java.util.HashMap;

@Service
public class AIService {

    @Value("${huggingface.api.url}")
    private String apiUrl;

    @Value("${huggingface.api.key}")
    private String apiKey;

    @Value("${huggingface.model.resume}")
    private String resumeModel;

    @Value("${huggingface.model.chat}")
    private String chatModel;

    private final WebClient webClient;

    public AIService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public Mono<String> callHFModel(String model, String input) {
        Map<String, String> body = new HashMap<>();
        body.put("inputs", input);

        return webClient.post()
                .uri(apiUrl + model)
                .header("Authorization", "Bearer " + apiKey)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .onErrorResume(e -> Mono.just("Error calling AI Service: " + e.getMessage()));
    }

    public void analyzeResume(String resumeText) {
        // Implementation for skill extraction and scoring
    }
}
